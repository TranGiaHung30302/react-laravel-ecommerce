<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function getProducts(Request $request)
    {
        $products = Product::orderBy('created_at', 'DESC')
            ->where('status', 1);

        //Filter Products by Category
        if (!empty($request->category_id)) {
            $categoryArray = explode(',', $request->category_id);
            $products = $products->whereIn('category_id', $categoryArray);
        }

        //Filter Products by Brand
        if (!empty($request->brand_id)) {
            $brandArray = explode(',', $request->brand_id);
            $products = $products->whereIn('brand_id', $brandArray);
        }

        $products = $products->get();

        return response()->json([
            'status' => 200,
            'data' => $products
        ], 200);
    }
    public function latestProducts()
    {
        $products = Product::orderBy('created_at', 'DESC')
            ->where('status', 1)
            ->limit(8)
            ->get();

        return response()->json([
            'status' => 200,
            'data' => $products
        ], 200);
    }

    public function featuredProducts()
    {
        $products = Product::orderBy('created_at', 'DESC')
            ->where('status', 1)
            ->where('is_featured', "yes")
            ->limit(8)
            ->get();

        return response()->json([
            'status' => 200,
            'data' => $products
        ], 200);
    }

    public function getCategories()
    {
        $categories = Category::orderBy('name', 'DESC')
            ->where('status', 1)
            ->limit(8)
            ->get();

        return response()->json([
            'status' => 200,
            'data' => $categories
        ], 200);
    }

    public function getBrands()
    {
        $brands = Brand::orderBy('name', 'DESC')
            ->where('status', 1)
            ->limit(8)
            ->get();

        return response()->json([
            'status' => 200,
            'data' => $brands
        ], 200);
    }

    public function getProduct($id)
    {
        // $product = Product::with('product_images', 'product_sizes')->find($id);

        $product = Product::with('product_images', 'product_sizes.size')->find($id);

        if ($product == null) {
            return response()->json([
                'status' => 404,
                'message' => 'Product not found',
            ], 404);
        }

        // $productSizes = $product->product_sizes()->pluck('size_id');

        return response()->json([
            'status' => 200,
            'data' => $product
            // 'productSizes' => $productSizes
        ]);
    }
}
