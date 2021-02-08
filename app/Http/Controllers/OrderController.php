<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Order;
use App\Models\Customer;

class OrderController extends Controller
{
    public function index() {
        return Order::first();
        /* return Order::first()->customer; */
    }

    public function linkCustomer(Request $request){
       /*  $linkCustomer = Customer::findOrFail($request->id); */
        $linkCustomer = DB::select('select * from customers where customer_id = :id', ['id' => $request->id]);
        return $linkCustomer;
    }
}
