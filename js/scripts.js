//
$(document).ready(function(){
    $('.ohje').hide();

    //Tuo sivulle näkyviin localStoragesta tiedot
    $('.lista').html(localStorage.getItem('listTavarat'));
    

      //Sovelluksen selvennys teksti näkyviin ja piiloon  
    $(".katsoOhje").click(function(){
        $(".ohje").fadeIn();
    });
    $(".piillotaOhje").click(function(){
     $(".ohje").fadeOut();
     });
    // 
    $('.tehtava').submit(function(event){
        
        event.preventDefault();
        let item = $('.input').val();
        
        //jos "item" on lyhyempi kuin 3 merkkiä, sivu ilmoittaa siitä
        if( item.length < 3 && item.length > 0){
            alert("Tehtävä on liian lyhyt.") 
            event.prevent(this);
          }
           //jos "item" on tyhjä, sivu ilmoittaa siitä kun yrität lisätä tyhjää tehtävää
          if( item == ''){
            alert("Et ole antanut tehtävää, jonka voisi lisätä listalle.") 
          }
          if(item){
            $('.lista').append(
                "<li class='tavara'><input class='check' type='checkbox'>" + item + 
                "<button class='poista'>X</button></li>"
            );
            console.log("Tallennetaan listaan...")
            //tehtävä lisätään localStorageen
            localStorage.setItem('listTavarat', $('.lista').html());
            $('.input').val("");
        }
    });
    //Tekee tehtävän tehdyksi tai ei
    $(document).on('change', '.check', function() 
    {
      if($(this).attr('checked')) 
      {
        $(this).removeAttr('checked');
      } 
      else 
      {
        $(this).attr('checked', 'checked');
      }
      $(this).parent().toggleClass('completed');
      
      localStorage.setItem('listTavarat', $('.lista').html());
    });
    //poistaa listalta yhden valitun tehtävän
   $(document).on('click', '.poista', function() 
  {
    $(this).parent().remove();
    
    localStorage.setItem('listTavarat', $('.lista').html());
  });
   // poistaa kaikki tehtävät listalta
    $(document).on('click', '.poistaKaikki', function() 
    {
        localStorage.removeItem('listTavarat');
        $('.lista').html(localStorage.getItem('listTavarat'));
    });
});