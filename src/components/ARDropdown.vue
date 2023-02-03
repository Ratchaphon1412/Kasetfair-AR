<style>
.dropbtn {
  color: white;
  cursor: pointer;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #e5e4df;
  min-width: 105px;
  z-index: 1;
}

.dropdown-content a {
  color: black;
  display: block;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown:hover .dropbtn {
  background-color: #4c7c63;
}

.show {display: block;}
</style>
<script>
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
</script>



<template>
    <div class="dropdown" style="float:right;">
        <button class="font-medium bg-[#57855E] dropbtn rounded py-1 px-5  text-sm">ลอง AR อื่น ๆ</button>
        <div class=" dropdown-content border-none shadow-lg">
          <router-link :to="{ name: 'ar0' }">
            <a class="border-2 border-black py-1 px-4 text-sm">พญานาค</a>
          </router-link>
          <router-link :to="{ name: 'ar1' }">
            <a class="border-x-2 border-b-2 border-black py-1 px-4 text-sm">สามบูรพาจารย์</a>
          </router-link>
          <router-link :to="{ name: 'ar2' }">
            <a class="border-x-2 border-b-2 border-black py-1 px-4 text-sm">วัว</a>
          </router-link>
          <router-link :to="{ name: 'ar3' }">
            <a class="border-x-2 border-black py-1 px-4 text-sm">คณะแพทย์</a>
          </router-link>
          <router-link :to="{ name: 'ar4' }">
            <a class="border-2 border-black py-1 px-4 text-sm">พรีเมียม</a>
          </router-link>
          <router-link :to="{ name: 'ARX' }">
            <a class="border-2 border-black py-1 px-4 text-sm">สถาปัตย์
              
            </a>
          </router-link>

        </div>
    </div>
</template>