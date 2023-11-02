<?php

namespace App\Console\Commands\PedalEmpire;

use App\Util\PedalEmpireToItems;
use Eddy\Crawlers\PedalEmpire\PedalEmpireURL;
use Illuminate\Console\Command;

class SeedFromJson extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'pem:from {json}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Attempt to seed database with items from Pedal Empire json file.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $fp = $this->argument('json');
        if (!file_exists($fp)) {
            $this->error('JSON file not found at path: ' . $fp);
            exit(0);
        }
        try {
            $n = ucfirst(preg_replace('/\.json$/', '', basename($fp)));
            // dd($n);
            $data = json_decode(file_get_contents($fp), true);
            $pe = new PedalEmpireURL();
            $transformed = $pe->process($data, $n);
            dd($transformed);

        } catch (\Throwable $e) {
            $this->error('An error was encountered!');
            throw $e;
        }
    }
}
