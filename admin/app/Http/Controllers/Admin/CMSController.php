<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\CMS;
use App\Faqs;
use App\ContactInfo;

class CMSController extends Controller
{

    public function about_us()
    {
        $cms = CMS::select('*')->where('id',1)->first();
        
        return view('admin/CMS/page',compact('cms'));
    }

    public function privacy_policy()
    {
        $cms = CMS::select('*')->where('id',2)->first();

        return view('admin/CMS/page',compact('cms'));
    }

    public function terms_condition()
    {
        $cms = CMS::select('*')->where('id',3)->first();

        return view('admin/CMS/page',compact('cms'));
    }

    public function updatecms(Request $request)
    {

        $input = $request->all();
        $id = $input['id'];
        $data = array(
            'description' => $input['description'],
          );

       if($id == 1){
        if(CMS::where('id', $id )->update($data)){
          return back()->with('success',"About Us description has been updated successfully.");
        }
       }else if($id == 2){
        if(CMS::where('id', $id )->update($data)){
            return back()->with('success',"Privacy policy description has been updated successfully.");
          }
       }else if($id == 3){
        if(CMS::where('id', $id )->update($data)){
            return back()->with('success',"Terms and Conditions description has been updated Successfully.");
          }
       }else{
        return back()->with('error',"Somthing wrong.");
       }
     }


     public function faqs(Request $request)
     {
        $faqs = Faqs::select('*')->get();
        //dd( $faqs);
          return view('admin/CMS/faqs',compact('faqs'));
     }

     public function add_question(Request $request)
     {

          return view('admin/CMS/addQuestion');
     }


     public function question_status($id)
     {
       $faqs = Faqs::select('*')->where('id',$id)->first();

       if($faqs['status']==1){
         $data = array(
           'status' => 0
         );
       }else{
         $data = array(
           'status' => 1
         );
       }
       if(Faqs::where('id', $id )->update($data)){

        return back()->with('success',"Question status change Successfully.");
       }else{

       return back()->with('error',"Somthing wrong.");
       }
     }


     public function edit_question($id)
     {

         $faqs = Faqs::select('*')->where('id',decrypt($id))->first();
        return view('admin/CMS/edit_question',compact('faqs'));
     }

     public function update_question(Request $request)
     {
          $input = $request->all();

         $id = $input['id'];

          $data = array(
             'questions' => $input['question'],
             'answers' => $input['answer'],
           );


         if(Faqs::where('id', $id )->update($data)){
           return back()->with('success',"Question has been updated Successfully.");
         }else{
           return back()->with('error',"Somthing wrong.");
         }

     }

     public function insert_question(Request $request)
     {
       $input = $request->all();


       $data = array(
           'questions' => $input['question'],
           'answers' => $input['answer'],
         );


       if(Faqs::insert($data)){

          return back()->with('success',"Question has been Add Successfully.");
         }else{

         return back()->with('error',"Somthing wrong.");
         }

    }

     public function delete_question($id)
     {

         if(Faqs::where('id',decrypt($id))->delete()){

             return back()->with('success',"Question delete Successfully.");
         }else{

         return back()->with('error',"Somthing wrong.");
         }
     }



     public function contact_information(Request $request)
     {
         $contact_info = ContactInfo::select('*')->where('id',1)->first();
         //dd( $contact_info);
          return view('admin/CMS/contact_information',compact('contact_info'));
     }

     public function update_contact_info(Request $request)
     {

         //error_reporting(0);
         $input = $request->all();

         $id = $input['id'];
         $data = array(
             'email' => $input['email'],
             'contact_no' => $input['contact_no'],
             'address' => $input['address'],
             'android_link' => $input['android_link'],
             'ios_link' => $input['ios_link'],
             'facebook_link' => $input['facebook_link'],
             'twitter_link' => $input['twitter_link'],
             'instagram_link' => $input['instagram_link'],
             'discord_link' => $input['discord_link'],
           );


         if(ContactInfo::where('id', $id )->update($data)){
           return back()->with('success',"Contact information has been upadated successfully.");
         }else{
             return back()->with('error',"Somthing wrong.");
         }

     }


}
