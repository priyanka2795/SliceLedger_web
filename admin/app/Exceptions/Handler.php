<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Auth\AuthenticationException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Throwable  $exception
     * @return void
     *
     * @throws \Throwable
     */
    public function report(Throwable $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Throwable  $exception
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @throws \Throwable
     */
    public function render($request, Throwable $exception)
    {

        if ($exception instanceof \Illuminate\Session\TokenMismatchException) {
                if ($request->expectsJson()) {
                    $string = [
                            'status' => 401,
                            'message' => 'Unauthenticated',
                            'results' => (object) []
                        ];
                    $res = $this->encryptData($string);
                    return response()->json($res);
                }
            return redirect()->route('login');
        };

        return parent::render($request, $exception);
    }

    /**
     * Convert an authentication exception into an unauthenticated response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Illuminate\Auth\AuthenticationException  $exception
     * @return \Illuminate\Http\Response
     */
    protected function unauthenticated($request, AuthenticationException $exception)
    {
        // Get route prefix
        $routePrefix = $request->route()->getPrefix();

        // If admin unauthenticated
        if( $routePrefix === '/admin' ) {
            return redirect()->guest(route('login'));
        }
        // Override message for unauthenticated
        if ($request->expectsJson()) {
            $string = [
                    'status' => 401,
                    'message' => 'Unauthenticated',
                    'results' => (object) []
                ];
            $res = $this->encryptData($string);
            return response()->json($res);
        }

    }

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
}
