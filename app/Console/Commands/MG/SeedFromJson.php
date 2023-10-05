<?php

namespace App\Console\Commands\MG;

use App\Models\Brand;
use App\Models\Item;
use App\Models\ItemType;
use App\Util\ModularGridToItems;
use Eddy\Crawlers\ModularGrid\Wrapper;
use Illuminate\Console\Command;
use Illuminate\Contracts\Cache\Store;
use Illuminate\Support\Facades\Storage;

class SeedFromJson extends Command
{
    private array $ids = [];

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'mog:from {jsonfile}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Seed database from json for a modulargrid rack.';

    public function __construct(private ?Wrapper $mg = null)
    {
        parent::__construct();
        if (!$mg) $this->mg = new Wrapper();
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $path = $this->argument('jsonfile');
        $disk = Storage::build([
            'root' => getcwd(),
            'driver' => 'local'
        ]);
        if (!$disk->exists($path)) {
            throw new \InvalidArgumentException(
                'Could not locate json file: ' . $path
            );
        }

        (new ModularGridToItems($this->mg))->process($disk->get($path));
        $this->info('Finished!');
    }
}
