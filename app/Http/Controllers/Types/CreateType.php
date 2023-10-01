<?php

namespace App\Http\Controllers\Types;

use App\Http\Controllers\Controller;
// use Illuminate\Http\Request;
use Inertia\Inertia;

class CreateType extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke()
    {
        return Inertia::render('Types/CreateType');
    }
}
