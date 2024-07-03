<template>
    <div class="container">
    <div class="sidebar">
      <div class="menu-btn"><i class="ph-bold ph-caret-left"></i></div>
      <div class="head">
        <div class="user-img"><img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTUzMjAyMTh8&ixlib=rb-4.0.3&q=85" alt=""></div>
        <div class="user-details">
          <p class="title">web developer</p>
          <p class="name">Kalvin Calimag</p>
        </div>
      </div>
      <div class="nav">
        <div class="menu">
          <p class="title">Main</p>
          <ul>
            <li><a href="#"><i class="icon ph-bold ph-house-simple"></i><span class="text">Dashboard</span></a></li>
            <li><a href="#"><i class="icon ph-bold ph-user"></i><span class="text">Viewers</span><i class="arrow ph-bold ph-caret-down"></i></a>
              <ul class="sub-menu">
                <li><a href="#"><span class="text">Users</span></a></li>
                <li><a href="#"><span class="text">Subscribers</span></a></li>
              </ul>
            </li>
            <li><a href="#"><i class="icon ph-bold ph-calendar-blank"></i><span class="text">Agenda</span></a></li>
            <li><a href="#"><i class="icon ph-bold ph-chart-bar"></i><span class="text">Revenue</span><i class="arrow ph-bold ph-caret-down"></i></a>
              <ul class="sub-menu">
                <li><a href="#"><span class="text">Earnings</span></a></li>
                <li><a href="#"><span class="text">Funds</span></a></li>
                <li><a href="#"><span class="text">Declines</span></a></li>
                <li><a href="#"><span class="text">Payouts</span></a></li>
              </ul>
            </li>
            <li class="active"><a href="#"><i class="icon ph-bold ph-file-text"></i><span class="text">Articles</span></a></li>
          </ul>
        </div>
        <div class="menu">
          <p class="title">Settings</p>
          <ul>
            <li><a href="#"><i class="icon ph-bold ph-gear"></i><span class="text">Settings</span></a></li>
          </ul>
        </div>
      </div>
      <div class="menu">
        <p class="title">Account</p>
        <ul>
          <li><a href="#"><i class="icon ph-bold ph-info"></i><span class="text">FAQ</span></a></li>
          <li><a href="#"><i class="icon ph-bold ph-sign-out"></i><span class="text">Logout</span></a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        methods: {
            toggleMenu() {
                $(".menu > ul > li").click(function (e) {
    // Remove the 'active' class from other menu items
    $(this).siblings().removeClass("active");
    // Toggle the 'active' class on the clicked menu item
    $(this).toggleClass("active");
    // Toggle the visibility of the submenu
    $(this).find("ul").slideToggle();
    // Close other submenus if they are open
    $(this).siblings().find("ul").slideUp();
    // Remove the 'active' class from submenu items
    $(this).siblings().find("ul").find("li").removeClass("active");
});

$(".menu-btn").click(function () {
    // Toggle the 'active' class on the sidebar
    $(".sidebar").toggleClass("active");
});

            }
        },
        mounted() {
            this.toggleMenu();
        }
    }
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Inter:100,200,300,regular,500,600,700,800,900);

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Inter", sans-serif;
}
body {
  background-color: #ff8080;
}
.container {
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 100vh;
}
.sidebar {
  position: relative;
  width: 256px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #fff;
  padding: 24px;
  border-radius: 30px;
  transition: all 0.3s;
}
.sidebar {
  display: flex;
  gap: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f6f6f6;
}

.head {
  display: flex;
  gap: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f6f6f6;
}

.user-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
}
.user-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.user-details .title,
.menu .title {
  font-size: 10px;
  font-weight: 500;
  color: #757575;
  text-transform: uppercase;
  margin-bottom: 10px;
}
.user-details .name {
  font-size: 14px;
  font-weight: 500;
}
.nav {
  flex: 1;
}
.menu ul li {
  position: relative;
  list-style: none;
  margin-bottom: 5px;
}
.menu ul li a {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #757575;
  text-decoration: none;
  padding: 12px 8px;
  border-radius: 8px;
  transition: all 0.3s;
}
.menu ul li > a:hover,
.menu ul li.active > a {
  color: #000;
  background-color: #f6f6f6;
}
.menu ul li .icon {
  font-size: 20px;
}
.menu ul li .text {
  flex: 1;
}
.menu ul li .arrow {
  font-size: 14px;
  transition: all 0.3s;
}
.menu ul li.active .arrow {
  transform: rotate(180deg);
}
.menu .sub-menu {
  display: none;
  margin-left: 20px;
  padding-left: 20px;
  padding-top: 5px;
  border-left: 1px solid #f6f6f6;
}
.menu .sub-menu li a {
  padding: 10px 8px;
  font-size: 12px;
}
.menu:not(:last-child) {
  padding-bottom: 10px;
  margin-bottom: 20px;
  border-bottom: 2px solid #f6f6f6;
}
.menu-btn {
  position: absolute;
  right: -14px;
  top: 3.5%;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #757575;
  border: 2px solid #f6f6f6;
  background-color: #fff;
}
.menu-btn:hover i {
  color: #000;
}
.menu-btn i {
  transition: all 0.3s;
}
.sidebar.active {
  width: 92px;
}
.sidebar.active .menu-btn i {
  transform: rotate(180deg);
}
.sidebar.active .user-details {
  display: none;
}
.sidebar.active .menu .title {
  text-align: center;
}
.sidebar.active .menu ul li .arrow {
  display: none;
}
.sidebar.active .menu > ul > li > a {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.sidebar.active .menu > ul > li > a .text {
  position: absolute;
  left: 70px;
  top: 50%;
  transform: translateY(-50%);
  padding: 10px;
  border-radius: 4px;
  color: #fff;
  background-color: #000;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s;
}
.sidebar.active .menu > ul > li > a .text::after {
  content: "";
  position: absolute;
  left: -5px;
  top: 20%;
  width: 20px;
  height: 20px;
  border-radius: 2px;
  background-color: #000;
  transform: rotate(45deg);
  z-index: -1;
}
.sidebar.active .menu > ul > li > a:hover .text {
  left: 50px;
  opacity: 1;
  visibility: visible;
}
.sidebar.active .menu .sub-menu {
  position: absolute;
  top: 0;
  left: 20px;
  width: 200px;
  border-radius: 20px;
  padding: 10px 20px;
  border: 1px solid #f6f6f6;
  background-color: #fff;
  box-shadow: 0px 10px 8px rgba(0, 0, 0, 0.1);
}
</style>