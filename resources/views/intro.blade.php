@extends('layouts.app')

@section('content')
<div class="card">
    <div class="card-body">
        <h1>SafeDrunk</h1>
        <h3>Keep track of your alcohol consumption</h3>
        <div class="row">
            <div class="col-lg-4">
                <p>Add drinks as you consume them during a session. Select beverages from our public database or define your own drinks!</p>
                <p>See your estimated blood alcohol level and its effects on your body.</p>
                <p>It has never been so easy to keep yourself from involuntarily drinking too much on a night out!</p>
            </div>
            <div class="col-lg-8">
                <img src="/images/drinks.png" style="width: 100%;">
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-lg-8">
                <img src="/images/statistics.png" style="width: 100%;">
            </div>
            <div class="col-lg-4">
                <p>Track your history of alcohol consumption.</p>
                <p>See trends in how much you drink, or use the charts to help keep predefined limits.</p>
            </div>
        </div>
        <hr>
        <h3 class="text-center mt-3"><a href="{{ route('login') }}" class="btn btn-primary">Log in</a> to get started!</h3>
    </div>
</div>
@endsection
