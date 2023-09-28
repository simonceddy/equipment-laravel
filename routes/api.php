<?php

use App\Http\Controllers\Brands\BrandsAPI;
use App\Http\Controllers\Items\ItemAPI;
use App\Http\Controllers\TotalBrandsController;
use App\Http\Controllers\TotalItemsController;
use App\Http\Controllers\Types\TypesAPI;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('brand/total', TotalBrandsController::class);
Route::get('item/total', TotalItemsController::class);

Route::apiResources([
    'brand' => BrandsAPI::class,
    'item' => ItemAPI::class,
    'type' => TypesAPI::class,
]);
