import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "../context/CartContext"; // adjust your path


export function BuyingPage({ product }) {
const { addToCart } = useCart();


if (!product) return <p>Loading...</p>;


return (
<div className="max-w-4xl mx-auto p-6">
<div className="grid md:grid-cols-2 gap-6">
<img
src={product.image}
alt={product.brand}
className="w-full rounded-2xl shadow-lg object-cover"
/>


<div>
<h1 className="text-3xl font-bold mb-2">{product.brand}</h1>
<p className="text-lg mb-4">{product.model}</p>


<p className="text-2xl font-semibold mb-4">₹{product.price}</p>


<p className="text-sm text-gray-600 mb-6">Type: {product.type}</p>


<Button
className="w-full py-3 text-lg rounded-xl"
onClick={() => addToCart(product)}
>
Add to Cart
</Button>
</div>
</div>
</div>
);
}