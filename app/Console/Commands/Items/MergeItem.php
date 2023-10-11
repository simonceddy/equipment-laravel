<?php

namespace App\Console\Commands\Items;

use App\Util\MergeItems;
use Illuminate\Console\Command;

class MergeItem extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'item:merge {id}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Locate and merge duplicates of the item with the given ID.';

    public function __construct(private ?MergeItems $merge = null)
    {
        parent::__construct();
        if (!$merge) $this->merge = new MergeItems();
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $id = $this->argument('id');
        if (!is_numeric($id)) {
            $this->error('ID must be numerical!');
            exit(1);
        }

        $this->merge->findSimilar($id);
    }
}
