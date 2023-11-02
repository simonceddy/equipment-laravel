<?php

namespace App\Console\Commands\MG;

use App\Util\ModularGridToItems;
use Eddy\Crawlers\ModularGrid\Wrapper;
use GuzzleHttp\Client;
use Illuminate\Console\Command;

class SeedModules extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'mog:rack {url}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Seed modules from a rack on modulargrid';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $url = $this->argument('url');
        if (!$url) $this->error('URL is required!');
        else {
            try {
                (new ModularGridToItems(new Wrapper()))->processURL($url);
                $this->info('Items stored successfully!');
            } catch (\Throwable $e) {
                $this->error('An error was encountered!');
                throw $e;
            }

        }
    }
}
