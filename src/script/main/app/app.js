/**
 * Created by Administrator on 2015/5/13.
 */
React.render(
  <div>
    <h1>Hello, worldPul!</h1>
    <h2>welcome</h2>
    <h3>again</h3>
    <h4>adfa</h4>
  </div>,
  document.getElementById('example')
);

var CommentBox = React.createClass({
  render:function(){
//        var _style = "width:{this.pros.width};height:{this.pros.height};outline:2px solid black;";
    return (
      <div className="commentBox" style="width:{this.pros.width};height:{this.pros.height};outline:2px solid black;">
      Hello, World! I am a CommentBox.
      </div>
      );
  }
});

React.render(new CommentBox({
  width:'200px',
  height:'100px'
}), document.getElementById('example'));