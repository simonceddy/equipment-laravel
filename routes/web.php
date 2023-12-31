<?php

use App\Http\Controllers\{
    ProfileController,
    UploadImage,
};
use App\Http\Controllers\Brands\{
    ListBrands,
    ShowBrand,
    CreateBrand,
    DeleteBrand,
    EditBrand,
    StoreBrand,
    UpdateBrand
};
use App\Http\Controllers\Cleanup\{
    TrimItemNames,
};
use App\Http\Controllers\Items\{
    AddTypeToItem,
    CreateItem,
    DeleteItem,
    ListItems,
    EditItem,
    RemoveTypeFromItem,
    SetBrandForMany,
    ShowItem,
    StoreItem,
    UpdateBrandForMany,
    UpdateItem
};
use App\Http\Controllers\Types\{
    CreateType, DeleteType, EditType, ListTypes, ShowType, StoreType, UpdateType
};
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::post('/storage/upload', UploadImage::class);

Route::get('/brands', ListBrands::class);
Route::get('/brand/create', CreateBrand::class);
Route::post('/brand/store', StoreBrand::class);
Route::get('/brand/{brand}', ShowBrand::class);
Route::get('/brand/{brand}/edit', EditBrand::class);
Route::put('/brand/{brand}', UpdateBrand::class);
Route::delete('/brand/{brand}', DeleteBrand::class);

Route::get('/items', ListItems::class);
Route::get('/items/trimNames', TrimItemNames::class);
Route::get('/items/updateBrand', SetBrandForMany::class);
Route::post('/items/updateBrand', UpdateBrandForMany::class);
Route::get('/item/create', CreateItem::class);
Route::post('/item/store', StoreItem::class);
Route::get('/item/{item}', ShowItem::class);
Route::get('/item/{item}/edit', EditItem::class);
Route::put('/item/{item}/addType/{type}', AddTypeToItem::class);
Route::put('/item/{item}/removeType/{type}', RemoveTypeFromItem::class);
Route::put('/item/{item}', UpdateItem::class);
Route::delete('/item/{item}', DeleteItem::class);

Route::get('/type/create', CreateType::class);
Route::post('/type/store', StoreType::class);
Route::get('/type/{type}/edit', EditType::class);
Route::put('/type/{type}', UpdateType::class);
Route::get('/type/{type}', ShowType::class);
Route::delete('/type/{type}', DeleteType::class);
Route::get('/types', ListTypes::class);

require __DIR__.'/auth.php';
