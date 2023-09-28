<?php

namespace App\Http\Controllers\Items;

use App\Http\Controllers\Controller;
use App\Models\Item;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ListItems extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'verified']);
    }

    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $filter = $request->query('filter', false);
        // $page = $request->query('page', false);
        /** @var \Illuminate\Database\Eloquent\Builder  */
        $q = $filter ? Item::where('name', 'like', '%' . $filter . '%')->with('brand')
            : Item::with('brand');
        /** @var \Illuminate\Pagination\LengthAwarePaginator */
        $data = $q->orderBy('name')->paginate(32);
        // $lastPage = $data->lastPage();
        return Inertia::render('Items/ListItems', [
            'data' => $data
        ]);
    }
}
