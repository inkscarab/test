<script type="text/javascript">

 

//Мы используем классы, но ИЕ не умеет их выбирать. Компенсируем этот недостаток.

if(document.getElementsByClassName) {

   

    getElementsByClass = function(classList, node) {  

      return (node || document).getElementsByClassName(classList)

    }

   

  } else {

   

    getElementsByClass = function(classList, node) {      

      var node = node || document,

      list = node.getElementsByTagName('*'),

      length = list.length, 

      classArray = classList.split(/\s+/),

      classes = classArray.length,

      result = [], i,j

      for(i = 0; i < length; i++) {

        for(j = 0; j < classes; j++) {

          if(list[i].className.search('\\b' + classArray[j] + '\\b') != -1) {

            result.push(list[i])

            break

          }

        }

      }

     

      return result

    }

  }

 

 

//Получаем координаты мыши

function mousePageXY(e)

{

 var x = 0, y = 0;

 

 if (!e) e = window.event;

 

 if (e.pageX || e.pageY)

 {

  x = e.pageX;

  y = e.pageY;

 }

 else if (e.clientX || e.clientY)

 {

  x = e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft) - document.documentElement.clientLeft;

  y = e.clientY + (document.documentElement.scrollTop || document.body.scrollTop) - document.documentElement.clientTop;

 }

 

 return {"x":x, "y":y};

}

 

 

window.onload = function() {

 

var scope_cont = getElementsByClass('scope_container', document);

 

//Калейдоскопов может быть несколько, учитываем это.

for (i=0;i<scope_cont.length;i++)

{

  scope_cont[i].onmouseover = function() {

      var sect = getElementsByClass('sv', this);

      var curscope = this;

      

      this.onmousemove = function(e){

        var mCur = mousePageXY(e); 

          for (n=0;n<sect.length;n++)

          {

            //У четных секторов фон двигается в одну сторону

            if (n%2) {

              sect[n].style.backgroundPosition = mCur.x + 'px ' + mCur.y + 'px';

            }

            //У нечетных — в другую

            else {

              sect[n].style.backgroundPosition = mCur.x*(-1) + 'px ' + mCur.y + 'px'

            }

          }

          

        }

    }

    scope_cont[i].onmouseout = function() {

      //Убираем за собой, чтоб не перегружать браузер

      document.onmousemove = null;

    }

}

}

</script>
