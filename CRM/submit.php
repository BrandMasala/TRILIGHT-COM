<?php
// Allow requests from your frontend
header("Access-Control-Allow-Origin: https://trilight5777.vercel.app");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Get query parameters
$name = urlencode(filter_var($_GET['customer_name'] ?? '', FILTER_SANITIZE_STRING));
$email = filter_var($_GET['email'] ?? '', FILTER_SANITIZE_EMAIL);
$mobile_number = filter_var($_GET['mobile_number'] ?? '', FILTER_SANITIZE_STRING);


$countrycode = filter_var($_GET['countrycode'] ?? '91', FILTER_SANITIZE_STRING);
$project_id = filter_var($_GET['project_id'] ?? '1', FILTER_SANITIZE_STRING);

//print_r($mobile_number);exit;
$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://thetrilight.tranquilcrmone.in/v2/createlead?api_key=TRNQUILCRMthetrilight&country_code=$countrycode&mobile_number=$mobile_number&project_id=$project_id&campaign_name=entercampaignname&adgroup_name=enteradgroup&ad_name=enteradname&customer_name=$name&email=$email&source_type=3&sub_source=Portal&remark=testnote&budget=0&spi=projectName&location=location&requirment_type=residential_commersial&property_type=rent_sale&configuration=bhk&activity_date=&activity_time=&activity_id=1",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'GET',
));

$response = curl_exec($curl);

if ($response === false) {
    echo json_encode(['error' => curl_error($curl)]);
    header('Location: https://thetrilight.com/');
} else {
   header('Location: https://thetrilight.com/thank-you/');
        exit;//$response; // Output the API response
}

curl_close($curl);
?>