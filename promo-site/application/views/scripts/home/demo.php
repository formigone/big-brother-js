<style>
   body {
      position: relative;
   }

   .player {
      position: absolute;
      top: 10px;
      left: 10px;
      z-index: 9999999;
   }
</style>

<script src="/assets/js/app.comp.js"></script>
<script>
   $(function(){
      main(document.getElementById('demoToolbar'), document.body);
      $(document).on('keydown', function(e){
         if (e.keyCode === 27 /* ESC */) {
            $('.bb-win').remove();
         }
      })
   });
</script>
<div class="container">

   <h3 id="tour" class="subhead">Live demo</h3>

   <div class="row">
      <div class="col-md-10 col-md-offset-1 text-center">
         <p>The following is based on a recording taken from <a href="http://www.formigone.com">www.formigone.com</a> at 10 FPS (frames per second).</p>

         <p class="alert alert-info text-left">
            <span class="glyphicon glyphicon-bullhorn"></span>
            Press <span class="label label-default">ESC</span> key to cancel recording playback.
         </p>

         <div id="demoToolbar"></div>
      </div>
   </div>
</div>