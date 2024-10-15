<?php

$UVindex = include('extract.php');


$locations = [
    '46.549995, 7.3499985' => 'Berner Oberland',
    '46.449997, 9.849998' => 'Bündner Berge',
    '46.85, 8.650002' => 'Innerschwyz',
    '46.35, 7.6500015' => 'Wallis',
];

$transformierteDaten = [];

foreach ($UVindex as $location) {
    $longlat = $location['latitude'] . ', ' . $location['longitude'];

    if (isset($locations[$longlat])) {
        $cityName = $locations[$longlat];
        echo '' . $cityName . '';
    } else {
        $cityName = 'Unknown';
    }
    $currentUVIndex = $location['current']['uv_index'];

    $transformierteDaten[] = [
        'ort' => $cityName,
        'uv_index' => $currentUVIndex,
    ];
}

$transformierteDatenJson = json_encode($transformierteDaten);

echo $transformierteDatenJson;
return $transformierteDatenJson;


