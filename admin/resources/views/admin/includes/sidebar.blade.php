
 <!-- Main Sidebar Container -->
 <aside class="main-sidebar sidebar-light-primary elevation-4 overflow-auto">
    <!-- Brand Logo -->
    <a href="" class="brand-link">
      <img src="{{ url('public/images/slice_logo_app.png') }}" alt="Admin Logo" class=" " style="opacity: 1.8; width: 40px;;">
       <span class="brand-text font-weight-light" ><b>&nbsp; Sliceledger</b></span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
            <li class="nav-item">
                <a href="https://testnet.bscscan.com/address/0xc1bac8d2bf9e2bd65fae82f1061d4ab2ff3c29a0" class="nav-link" target="blank">
                    <p>
                        View BSC Scan
                    </p>
                </a>
            </li>
          <li class="nav-item">
            <a href="{{ route('dashboard') }}" class="nav-link {{ (Request::segment(1) == 'dashboard') ? 'active' : '' }}">
            <i class="nav-icon fas fa-tachometer-alt"></i>
              <p>
                Dashboard
              </p>
            </a>
          </li>

          <li class="nav-item">
            <a href="{{ route('users.index') }}" class="nav-link  {{ (Request::segment(1) == 'users') ? 'active' : '' }}">
            <i class="nav-icon far fa-user" aria-hidden="true"></i>
              <p>
                Users
              </p>
            </a>
          </li>
          <li class="nav-item">
            <a href="{{ route('kyc-request') }}" class="nav-link  {{ (Request::segment(1) == 'kyc-request') ? 'active' : '' }}">
            <i class="nav-icon fa fa-file-text" aria-hidden="true"></i>
              <p>
                KYC Management
              </p>
            </a>
          </li>
          <li class="nav-item">
            <a href="{{ route('feedback.index') }}" class="nav-link  {{ (Request::segment(1) == 'feedback') ? 'active' : '' }}">
                <i class="fa fa-comments-o"></i>
              <p>
                Feedback Management
              </p>
            </a>
          </li>
          <li class="nav-item">
            <a href="{{ route('contact-list') }}" class="nav-link  {{ (Request::segment(1) == 'contact-list') ? 'active' : '' }}">
                <i class="fa fa-address-book"></i>
              <p>
                Contact Management
              </p>
            </a>
          </li>
           <li class="nav-item">
            <a href="{{ route('token_price') }}" class="nav-link  {{ (Request::segment(1) == 'token_price') ? 'active' : '' }}">
            <i class="nav-icon fas fa-dollar-sign"></i>
              <p> Slice Token Price</p>
            </a>
          </li>
          <li class="nav-item  menu-is-opening {{ (Request::segment(2) == 'buy' || Request::segment(2) == 'sell' || Request::segment(2) == 'transfer') ? 'menu-open' : '' }}">
            <a href="#" class="nav-link " data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">
              <i class="nav-icon fa fa-exchange"></i>
              <p>
                Token Transactions
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul class="nav nav-treeview collapse list-unstyled">
                <li class="nav-item">
                    <a href="{{ route('buy_token') }}" class="nav-link {{ (Request::segment(2) == 'buy') ? 'active' : '' }}">
                      <i class="far fa-circle nav-icon"></i>
                      <p>Buy Token</p>
                    </a>
                  </li>

                  <li class="nav-item">
                    <a href="{{ route('sale_token') }}" class="nav-link {{ (Request::segment(2) == 'sell') ? 'active' : '' }}">
                      <i class="far fa-circle nav-icon"></i>
                      <p>Sell Token</p>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a href="{{ route('transfer_toke') }}" class="nav-link {{ (Request::segment(2) == 'transfer') ? 'active' : '' }}">
                      <i class="far fa-circle nav-icon"></i>
                      <p>Transfer Token</p>
                    </a>
                  </li>

            </ul>
          </li>

          <li class="nav-item  menu-is-opening {{ (Request::segment(2) == 'add-fund' || Request::segment(2) == 'withdrawal') ? 'menu-open' : '' }}">
            <a href="#" class="nav-link " data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">
              <i class="nav-icon fa fa-credit-card"></i>
              <p>
                Wallet Transactions
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul class="nav nav-treeview collapse list-unstyled">
                <li class="nav-item">
                    <a href="{{ route('add-fund') }}" class="nav-link {{ (Request::segment(2) == 'add-fund') ? 'active' : '' }}">
                      <i class="far fa-circle nav-icon"></i>
                      <p>Add Funds</p>
                    </a>
                  </li>

                  <li class="nav-item">
                    <a href="{{ route('withdrawal') }}" class="nav-link {{ (Request::segment(2) == 'withdrawal') ? 'active' : '' }}">
                      <i class="far fa-circle nav-icon"></i>
                      <p>Withdrawal Funds</p>
                    </a>
                  </li>

            </ul>
          </li>

          <!--<li class="nav-item">-->
          <!--  <a href="{{ route('orders') }}" class="nav-link  {{ (Request::segment(1) == 'orders') ? 'active' : '' }}">-->
          <!--  <i class="nav-icon fab fa-jedi-order" aria-hidden="true"></i>-->
          <!--    <p>-->
          <!--      Orders-->
          <!--    </p>-->
          <!--  </a>-->
          <!--</li>-->
          <li class="nav-item  menu-is-opening {{ (Request::segment(2) == 'about_us' || Request::segment(2) == 'privacy_policy' || Request::segment(2) == 'terms_condition' || Request::segment(2) == 'contact_information' ||  Request::segment(2) == 'faqs') ? 'menu-open' : '' }}">
            <a href="#" class="nav-link " data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">
              <i class="nav-icon fa fa-file-text"></i>
              <p>
                CMS
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul class="nav nav-treeview collapse list-unstyled">
                <li class="nav-item">
                    <a href="{{ route('about_us') }}" class="nav-link {{ (Request::segment(1) == 'about_us') ? 'active' : '' }}">
                      <i class="far fa-circle nav-icon"></i>
                      <p>About Us</p>
                    </a>
                  </li>

                  <li class="nav-item">
                    <a href="{{ route('privacy_policy') }}" class="nav-link {{ (Request::segment(1) == 'privacy_policy') ? 'active' : '' }}">
                      <i class="far fa-circle nav-icon"></i>
                      <p>Privacy Policy</p>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a href="{{ route('faqs') }}" class="nav-link  {{ (Request::segment(1) == 'faqs') ? 'active' : '' }} ">
                      <i class="far fa-circle nav-icon"></i>
                      <p>FAQs</p>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a href="{{ route('terms_condition') }}" class="nav-link {{ (Request::segment(1) == 'terms_condition') ? 'active' : '' }}">
                      <i class="far fa-circle nav-icon"></i>
                      <p>Terms and Conditions</p>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a href="{{ route('contact_information') }}" class="nav-link {{ (Request::segment(1) == 'contact_information') ? 'active' : '' }}">
                      <i class="far fa-circle nav-icon"></i>
                      <p>Contact Information</p>
                    </a>
                  </li>

            </ul>
          </li>
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>
