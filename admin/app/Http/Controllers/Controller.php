<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Bezhanov\Ethereum\Converter;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;


    public function encryptData($data)
    {
        $data = json_encode($data);
        $encryption_method = 'aes-256-cbc';
        // Generate a 256-bit encryption key
        // This should be stored somewhere instead of recreating it each time
        //$encryption_key = openssl_random_pseudo_bytes(32);
        $encryption_key = "xlhF31NeOlibJcoOW9tvZg7TkHcAZI3a";
        // Generate an initialization vector
        // This *MUST* be available for decryption as well
        //$iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length(AES_256_CBC));
        $iv = "qwertyuiopasdfgh";

        // Encrypt $data using aes-256-cbc cipher with the given encryption key and
        // our initialization vector. The 0 gives us the default options, but can
        // be changed to OPENSSL_RAW_DATA or OPENSSL_ZERO_PADDING
        $encrypted = openssl_encrypt($data, $encryption_method, $encryption_key, 0, $iv);

        return $encrypted;
    }

    public function decryptData($string)
    {
         $encrypt_method = 'aes-256-cbc';
         $key = "xlhF31NeOlibJcoOW9tvZg7TkHcAZI3a";
         $iv = "qwertyuiopasdfgh";
         $output = openssl_decrypt(base64_decode($string), $encrypt_method, $key, 0, $iv);
         return $output;
    }


    public function exchangeCurrency()
    {
        $req_url = 'https://v6.exchangerate-api.com/v6/b9c98fc55c34a55b5dd54515/latest/USD';
        $response_json = file_get_contents($req_url);

        if(false !== $response_json) {
            $response = json_decode($response_json);
        }
        return response()->json($response->conversion_rates, 200);
    }


    public function createWallet()
    {
        $curl = curl_init();

        curl_setopt_array($curl, [
        CURLOPT_URL => "https://api-us-west1.tatum.io/v3/bsc/wallet",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "GET",
        CURLOPT_HTTPHEADER => [
            "x-api-key: ".config('global.METAMASK_API_KEY')
        ],
        ]);

        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);

        if ($err) {
            return $err;
        } else {
            return json_decode($response, true);
        }
    }

    public function createAddress($getxpub)
    {
        $curl = curl_init();

        curl_setopt_array($curl, [
            CURLOPT_URL => "https://api-us-west1.tatum.io/v3/bsc/address/".$getxpub['xpub']."/1",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET",
            CURLOPT_HTTPHEADER => [
                "x-api-key: ".config('global.METAMASK_API_KEY')
            ],
        ]);

        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);

        if ($err) {
            return $err;
        } else {
            return json_decode($response, true);
        }
    }

    public function createPrivetkey($getxpub)
    {
        $curl = curl_init();

        curl_setopt_array($curl, [
        CURLOPT_URL => "https://api-us-west1.tatum.io/v3/bsc/wallet/priv",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "POST",
        CURLOPT_POSTFIELDS => "{\"index\":1,\"mnemonic\":\"".$getxpub['mnemonic']."\"}",
        CURLOPT_HTTPHEADER => [
            "content-type: application/json",
            "x-api-key: ".config('global.METAMASK_API_KEY')
        ],
        ]);

        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);

        if ($err) {
            return $err;
        } else {
            return json_decode($response, true);
        }
    }

    public function buyToken($userPrivateKey, $tokeQuantity) {

        $converter = new Converter();
        $tokeQuantity = $converter->toWei($tokeQuantity, 'ether');

        $curl = curl_init();
        curl_setopt_array($curl, [
        CURLOPT_URL => "https://api-us-west1.tatum.io/v3/bsc/smartcontract",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "POST",
        CURLOPT_POSTFIELDS => "{
            \"contractAddress\":\"".config('global.CONTRACT_ADDRESS')."\",
            \"methodName\":\"buyToken\",
            \"methodABI\":{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"numTokens\",\"type\":\"uint256\"}],\"name\":\"buyToken\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},
            \"params\":[\"$tokeQuantity\"],
            \"fromPrivateKey\":\"$userPrivateKey\"}",
        CURLOPT_HTTPHEADER => [
            "content-type: application/json",
            "x-api-key: ".config('global.METAMASK_API_KEY')
        ],
        ]);

        $response = curl_exec($curl);
        $err = curl_error($curl);
        curl_close($curl);

        if ($err) {
            dd(json_decode($err, true));
            return json_decode($err, true);
        } else {
            return json_decode($response, true);
        }
    }

    public function saleToken($userPrivateKey, $tokeQuantity) {

        $converter = new Converter();
        $tokeQuantity = $converter->toWei($tokeQuantity, 'ether');

        $curl = curl_init();

        curl_setopt_array($curl, [
        CURLOPT_URL => "https://api-us-west1.tatum.io/v3/bsc/smartcontract",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "POST",
        CURLOPT_POSTFIELDS => "{
            \"contractAddress\":\"".config('global.CONTRACT_ADDRESS')."\",
            \"methodName\":\"saleToken\",
            \"methodABI\":{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"numTokens\",\"type\":\"uint256\"}],\"name\":\"saleToken\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},
            \"params\":[\"$tokeQuantity\"],
            \"fromPrivateKey\":\"$userPrivateKey\"}",
        CURLOPT_HTTPHEADER => [
            "content-type: application/json",
            "x-api-key: ".config('global.METAMASK_API_KEY')
        ],
        ]);

        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);

        if ($err) {
            return json_decode($err, true);
        } else {
            return json_decode($response, true);
        }
    }

    public function getBalance($address) {

        $curl = curl_init();

        curl_setopt_array($curl, [
        CURLOPT_URL => "https://api-us-west1.tatum.io/v3/bsc/smartcontract",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "POST",
        CURLOPT_POSTFIELDS => "{
            \"contractAddress\":\"".config('global.CONTRACT_ADDRESS')."\",
            \"methodName\":\"balanceOf\",
            \"methodABI\":{\"inputs\":[{\"internalType\":\"address\",\"name\":\"tokenOwner\",\"type\":\"address\"}],\"name\":\"balanceOf\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},
            \"params\":[\"$address\"]
        }",
        CURLOPT_HTTPHEADER => [
            "content-type: application/json",
            "x-api-key: ".config('global.METAMASK_API_KEY')
        ],
        ]);

        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);

        if ($err) {
            return json_decode($err, true);
        } else {
            return json_decode($response, true);
        }
    }


    public function transferToken($receiverAddress, $senderPrivateKey, $tokeQuantity) {

        $converter = new Converter();
        $tokeQuantity = $converter->toWei($tokeQuantity, 'ether');

        $curl = curl_init();
        curl_setopt_array($curl, [
        CURLOPT_URL => "https://api-us-west1.tatum.io/v3/bsc/smartcontract",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "POST",
        CURLOPT_POSTFIELDS => "{
            \"contractAddress\":\"".config('global.CONTRACT_ADDRESS')."\",
            \"methodName\":\"transfer\",
            \"methodABI\":{\"inputs\":[{\"internalType\":\"address\",\"name\":\"receiver\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"numTokens\",\"type\":\"uint256\"}],\"name\":\"transfer\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},
            \"params\":[\"$receiverAddress\", \"$tokeQuantity\"],
            \"fromPrivateKey\":\"$senderPrivateKey\"}",
        CURLOPT_HTTPHEADER => [
            "content-type: application/json",
            "x-api-key: ".config('global.METAMASK_API_KEY')
        ],
        ]);

        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);

        if ($err) {
            return json_decode($err, true);
        } else {
            return json_decode($response, true);
        }
    }



}
