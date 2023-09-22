<?php

namespace App\Console\Commands;

use App\Util\ModularGridToItems;
use Eddy\ModularGrid\Wrapper;
use GuzzleHttp\Client;
use Illuminate\Console\Command;

class SeedModules extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'seed:modules {url}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Seed modules from a rack on modulargrid';

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
        $url = $this->argument('url');
        if (!$url) $this->error('URL is required!');
        else {
            $res = $this->mg->client->request('GET', $url);

            $status = $res->getStatusCode();
            if ($status === 404) $this->error('Unable to resolve url: ' . $url);
            else if ($status !== 200) $this->error('Bad status for url: ' . $url);
            else {
                $this->info('Response received...');
                $body = $res->getBody()->getContents();
                $this->info('Crawling for json...');
                $json = $this->mg->crawl($body)->rackJson();
                try {
                    (new ModularGridToItems($this->mg))->process($json);
                    $this->info('Items stored successfully!');
                } catch (\Throwable $e) {
                    $this->error('An error was encountered!');
                    throw $e;
                }

            }
        }
    }
}
