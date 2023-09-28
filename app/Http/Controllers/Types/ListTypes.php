<?php
namespace App\Http\Controllers\Types;

use App\Http\Controllers\Controller;
use App\Models\ItemType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ListTypes extends Controller
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
        $q = $filter ? ItemType::where('name', 'like', '%' . $filter . '%')->withCount('items')
            : ItemType::withCount('items');
        /** @var \Illuminate\Pagination\LengthAwarePaginator */
        $data = $q->orderBy('name')->paginate(32);
        // $lastPage = $data->lastPage();
        return Inertia::render('Types/ListTypes', [
            'data' => $data
        ]);
    }
}
