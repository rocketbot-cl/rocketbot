Vue.component('app-header', {
    template:`<div>
    <header>
    <img loading='lazy' class="logo" alt="Rocketbot" src="flow/img/ISO_white.svg">
    <h4>obot Drawflow</h4>
    <small>v {{app.$data.version_app}}</small>
    
  </header> 
  <div class="menu">
    <ul>
      <li onclick="editor.changeModule('Home'); changeModule(event);" class="selected">
        <h4> {{ app.$data.robot_name }} </h4>
      </li>
      <li  class="selected"><a href="/"> <i class="fa fa-house-chimney"></i> {{app.$data.texts.home}} </a></li>
      <li @click="app.startrobot()"><i class="fa fa-play"></i>  {{app.$data.texts.run}}</li>
      <li @click="app.$data.robot_stop = true"><i class="fa fa-stop"></i>  {{app.$data.texts.stop}}</li>

      <li>
        <button class="btn btn-sm" onclick="editor.zoom_out()">
          <i class="fas fa-search-minus" ></i>
        </button>
        <button class="btn btn-sm" onclick="editor.zoom_reset()">
          <i class="fas fa-search" ></i>
        </button>
        <button class="btn btn-sm" onclick="editor.zoom_in()">
          <i class="fas fa-search-plus"></i>
        </button>
      </li>
      <li>
        <i id="lock" class="fas fa-lock" onclick="editor.editor_mode='fixed'; changeMode('lock');"></i>
        <i id="unlock" class="fas fa-lock-open" onclick="editor.editor_mode='edit'; changeMode('unlock');" style="display:none;"></i>
      </li>
      <li>
        <div @click="app.$data.viewVars=!app.$data.viewVars"><b>{</b>Variable<b>}</b></div>
      </li>
      <li>
        <div @click="app.addBot()"><i class="fa fa-save"></i> {{app.$data.texts.save}}</div>
      </li>
      <li>
      <div @click="app.exportModal()"><i class="fa fa-robot"></i> {{app.$data.texts.export_variable}}</div>
    </li>
    </ul>
  </div>
  </div>
  `,

})