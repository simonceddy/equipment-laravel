<?php

namespace App\Console\Commands\Items;

use App\Models\Item;
use Illuminate\Console\Command;

class FillIDs extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'item:fillids';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fill ID data fields for all items';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $items = Item::all();
        $errors = [];
        foreach ($items as $item) {
            $refID = $item->getAttribute('refId');
            if (!$refID) continue;
            $data = $item->getAttribute('data');
            if (isset($data['modulargrid_slug']) && !isset($data['modulargrid_id'])) {
                // Modulargrid ID
                $data['modulargrid_id'] = $refID;
            } else if (isset($data['pedalempire_url']) && !isset($data['pedalempire_id'])) {
                $data['pedalempire_id'] = $refID;
            }
            try {
                $item->setAttribute('data', $data);
                $item->save();
            } catch (\Throwable $e) {
                $errors[$item->getAttribute('id')] = $e;
            }
        }

        if (!empty($errors)) {
            $this->warn('Errors were encountered.');
        }
    }
}
