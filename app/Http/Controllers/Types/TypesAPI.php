<?php

namespace App\Http\Controllers\Types;

use App\Http\Controllers\Controller;
use App\Http\Requests\{StoreItemTypeRequest, UpdateItemTypeRequest};
use App\Models\ItemType;

class TypesAPI extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(ItemType::paginate(32));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreItemTypeRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(ItemType $itemType)
    {
        return response()->json($itemType);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateItemTypeRequest $request, ItemType $itemType)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ItemType $itemType)
    {
        //
    }
}
