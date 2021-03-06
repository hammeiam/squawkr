Backbone.CompositeView = Backbone.View.extend({
  addSubview: function (selector, subview) {
    this.subviews(selector).push(subview);
    // Try to attach the subview. Render it as a convenience.
    this.attachSubview(selector, subview.render());
  },

  attachSubview: function (selector, renderedSubview) {
    // this.$(selector).empty(); // DH: I added this
    this.$(selector).append(renderedSubview.$el);
    // Bind events in case `subview` has previously been removed from
    // DOM.
    renderedSubview.delegateEvents();

    if (renderedSubview.attachSubviews) {
      renderedSubview.attachSubviews();
    }
  },

  onRender: function(){
    _(this.subviews()).each(function(subviews, selector){
      _(subviews).each(function(subview){
        if(subview.onRender){
          subview.onRender();
        }
      })
    })
  },

  attachSubviews: function (subSelector) {
    // I decided I didn't want a function that renders ALL the
    // subviews together. Instead, I think:
    //
    // * The user of CompositeView should explicitly render the
    //   subview themself when they build the subview object.
    // * The subview should listenTo relevant events and re-render
    //   itself.
    //
    // All that is necessary is "attaching" the subview `$el`s to the
    // relevant points in the parent CompositeView.

    var view = this;

    if(subSelector){
      view.$(subSelector).empty();
      _(view.subviews(subSelector)).each(function (subview) {
        view.attachSubview(subSelector, subview);
      });
    } else {
      _(view.subviews()).each(function (subviews, selector) {
        view.$(selector).empty();
        _(subviews).each(function (subview) {
          view.attachSubview(selector, subview);
        });
      });
    }
  },

  remove: function () {
    Backbone.View.prototype.remove.call(this);
    _(this.subviews()).each(function (subviews) {  //subviews() is an object
      // underscores each returns (value, key, object)
      _(subviews).each(function (subview) { //subviews is an array
        subview.remove();
      });
    });
  },

  removeSubview: function (selector, subview) {
    subview.remove();

    var subviews = this.subviews(selector);
    subviews.splice(subviews.indexOf(subview), 1);
  },

  subviews: function (selector) {
    // Map of selectors to subviews that live inside that selector.
    // Optionally pass a selector and I'll initialize/return an array
    // of subviews for the sel.
    this._subviews = this._subviews || {};

    if (!selector) {
      return this._subviews;
    } else {
      this._subviews[selector] = this._subviews[selector] || [];
      return this._subviews[selector];
    }
  }
});
