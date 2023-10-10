<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;
use Spatie\ImageOptimizer\OptimizerChainFactory;

class UploadImage extends Controller
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
        if ($request->hasFile('uploaded-file')) {
            $image = $request->file('uploaded-file');
            $imageInstance = Image::make($image->getRealPath());
            $imageInstance->encode('webp');
            $fn = $image->getClientOriginalName() . '.webp';
            // dd($fn, $imageInstance);
            $path = storage_path('app/public');
            // Save the optimized image
            $imageInstance->save($path . '/' . $fn);

            $optimizerChain = OptimizerChainFactory::create();
            $optimizerChain->optimize($path . '/' . $fn);

            return response()->json([
                'success' => true,
                // TODO src
                'message' => 'File uploaded!',
                'src' => $fn
            ]);
        }
        return response()->json([
            'success' => false,
            'message' => 'No files uploaded!'
        ]);
    }
}
