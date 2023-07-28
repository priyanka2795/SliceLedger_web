<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\User;
use App\Feedback;
use Carbon\Carbon;
use Mail;
use Str;
use Hash;
use Yajra\DataTables\DataTables;

class FeedbackController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $feedbacks = Feedback::select('*')->latest()->get();
        return view('admin.feedback',compact('feedbacks'));
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'comment' => 'required'
        ]);

        $feedback = Feedback::find($request->feed_id);
        $feedback->status = 'completed';
        $feedback->save();

        \Mail::to($feedback->user->email)->send(new \App\Mail\FeedbackMail($request->comment, $feedback->user));
        return back()->with('success',"You have send mail to user successfully.");
    }

}
