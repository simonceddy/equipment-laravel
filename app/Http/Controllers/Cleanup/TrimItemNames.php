<?php

namespace App\Http\Controllers\Cleanup;

use App\Http\Controllers\Controller;
use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class TrimItemNames extends Controller
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
        try {
            Item::all()->each(function (Item $item) {
                $n = $item->getAttribute('name');
                if (Str::startsWith($n, ' ')) {
                    $item->setAttribute('name', trim($n));
                    $item->save();
                }
            });
        } catch (\Throwable $e) {
            throw $e;
        }

        return redirect('/items');
    }
}
