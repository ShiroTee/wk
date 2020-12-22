/**
 * Ext.ux.CopyButton - Clipboard Copy Button
 * Version 1.0
 * James Dempster letssurf@gmail.com
 * http://code.jdempster.com/
 */

/*global Ext,ZeroClipboard*/
Ext.namespace('Ext.ux');

/**
 * @class Ext.ux.CopyButton
 * @extends Ext.Button
 * @constructor
 * @param {Object} config
 */
Ext.ux.CopyButton = Ext.extend(Ext.Button, {
    /**
     * @cfg {String} value The value which is copied to the clipboard when the button is pressed
     */

    // private
    initComponent: function() {
        Ext.ux.CopyButton.superclass.initComponent.call(this);
        this.cls = this.ctCls;
        this.clip = new ZeroClipboard.Client();
        
        
    },

    // private
    afterRender: function() {
        
        Ext.ux.CopyButton.superclass.afterRender.call(this);
        this.clip.glue(this.getEl().dom);
        this.clip.hide();
        this.clip.addEventListener('mouseOver', this.clipMouseOver.createDelegate(this));
        this.clip.addEventListener('mouseOut', this.clipMouseOut.createDelegate(this));
        this.clip.addEventListener('mouseDown', this.clipMouseDown.createDelegate(this));
        this.clip.addEventListener('mouseUp', this.clipMouseUp.createDelegate(this));
    },

    // private
    onDestroy: function() {
        this.clip.destroy();
        Ext.ux.CopyButton.superclass.onDestroy.call(this);
    },

    // private
    onMouseOver: function() {
        if (!this.disabled) {
            this.clip.show();
        }
    },

    // private
    clipMouseDown: function() {
        this.clip.setText(this.getValue());
        this.el.addClass('x-btn-click');
        Ext.getDoc().on('mouseup', this.clipMouseUp, this);
    },

    // private
    clipMouseUp: function() {
        Ext.getDoc().un('mouseup', this.clipMouseUp, this);
        this.el.removeClass('x-btn-click');
        this.focus();
        this.fireEvent('click', this);
    },

    // private
    clipMouseOver: function() {
        if (!this.disabled) {
            this.el.addClass('x-btn-over');
            this.fireEvent('mouseover', this);
        }
    },
    
    // private
    clipMouseOut: function() {
        this.clip.hide();
        if (!this.disabled) {
            this.fireEvent('mouseout', this);
        }
    },

    getClip: function(){
        return this.clip;
    },
    /**
     * Sets the value that should be used when the button is pressed
     * @param {String} value The value to set
     */
    setValue: function(value) {
        this.value = String(value);
    },

    /**
     * Get the value that will be used when the user clicks the button
     * @return {String} value The value used to copy to the clipboard
     */
    getValue: function() {
        return this.value;
    }
});