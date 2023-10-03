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
        // TODO validate
        $filter = $request->query('filter', false);
        $sort = $request->query('sort', 'name');
        $desc = $request->query('desc', 0);

        if ($sort === 'brand') {
            $sort = 'brands.name';
        } else {
            $sort = 'items.' . $sort;
        }
        // $page = $request->query('page', false);
        /** @var \Illuminate\Database\Eloquent\Builder  */
        $q = $filter
            ? Item::where('items.name', 'like', '%' . $filter . '%')
                ->orWhere('brands.name', 'like', '%' . $filter . '%')
            : Item::query();
        $q->with(['brand', 'types']);
        $q->join('brands', 'items.brand_id', '=', 'brands.id');
        /** @var \Illuminate\Pagination\LengthAwarePaginator */
        $data = $q->orderBy($sort, $desc === '1' ? 'desc' : 'asc')
            ->select('items.*')
            ->paginate(64);
        // $lastPage = $data->lastPage();
        // dd($data);
        return Inertia::render('Items/ListItems', [
            'data' => $data
        ]);
    }
}
