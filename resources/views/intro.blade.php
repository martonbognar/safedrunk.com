@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
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
                        <h3 class="text-center mt-3"><a href="{{ route('login') }}" class="btn btn-primary">Log in</a> to get started!</h3>
                        <hr>
                        <p>Would you like to receive an e-mail when new features get added to the site? Sign up for the newsletter! (I swear there won't be many e-mails.)</p>
                        <!-- Begin Mailchimp Signup Form -->
                        <div id="mc_embed_signup">
                            <form action="https://gmail.us20.list-manage.com/subscribe/post?u=4030506127bc7abdf5df60cc5&amp;id=137ca7d6d0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
                                <div id="mc_embed_signup_scroll">
                                    <div class="input-group mb-3">
                                        <input type="email" value="" name="EMAIL" class="form-control" id="mce-EMAIL" placeholder="email address" required>
                                        <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
                                        <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_4030506127bc7abdf5df60cc5_137ca7d6d0" tabindex="-1" value=""></div>
                                        <div class="input-group-append">
                                            <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="btn btn-outline-primary">
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <!--End mc_embed_signup-->
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
