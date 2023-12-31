<?php

namespace App\Http\Controllers\Brands;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ListBrands extends Controller
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
        // TODO validate
        $filter = $request->query('filter', false);
        $sort = $request->query('sort', 'name');
        $desc = $request->query('desc', 0);

        /** @var \Illuminate\Database\Eloquent\Builder  */
        $q = $filter
            ? Brand::where('name', 'like', '%' . $filter . '%')->withCount('items')
            : Brand::withCount('items');
        /** @var \Illuminate\Pagination\LengthAwarePaginator */
        $data = $q->orderBy($sort, $desc === '1' ? 'desc' : 'asc')->paginate(64);

        return Inertia::render('Brands/ListBrands', [
            'data' => $data
        ]);
    }
}
