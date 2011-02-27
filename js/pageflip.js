var PageFlip = new Class({
    
    zIndex: 999,
    
    initialize: function(container, images){
        var els = [];
        var self = this;
        
        var la = new Element('a', {
            href: '#',
            'class': 'arrow-left'
        }).inject(container);
        var ra = new Element('a', {
            href: '#',
            'class': 'arrow-right'
        }).inject(container).fade('hide');
        
        var running = false;
        
        images.each(function(img){
            els[img] = new Element('div', {
                'class': 'page',
                styles: {
                    background: 'url(gfx/' + img + '.jpg) no-repeat',
                    width: 0,
                    'z-index': self.zIndex--
                }
            }).inject(container);
            
            els[img].get('morph').addEvent('complete', function(){
                running = false;
            });
        });
        this.zIndex = 999;
        
        els['front'].setStyle('width', 325);
        els['page-1-2'].setStyle('width', 325);
        //els['page-2-1'].setStyle('width', 325);
        
        
        var i = 0;
        container.addEvent('click', function(e){
            e.stop();
            if(running) return;
            switch(i++){
                case 0: // Seite 1 aufklappen
                    els['front'].set('morph', {
                        duration: 250
                    });
                    els['page-1-1'].set('morph', {
                        duration: 500
                    });
                    els['page-1-1'].setStyles({
                        left: 650,
                        'background-position': 0
                    });
                    els['front'].morph({
                        width: 0
                    });
                    els['page-1-1'].morph({
                        left: 0,
                        width: 325
                    });
                    running = true;
                    la.fade('out');
                    ra.fade('in');
                    break;
                    
                case 1: // Seite 2 aufklappen
                    els['page-1-2'].set('morph', {
                        duration: 250
                    });
                    els['page-2-2'].set('morph', {
                        duration: 500
                    });
                    els['page-2-2'].setStyle('left', 325);
                    els['page-1-2'].morph({
                        left: 650,
                        width: 0,
                        'background-position': -350
                    });
                    els['page-2-1'].morph({
                        width: 325
                    });
                    els['page-2-2'].morph({
                        left: 650,
                        width: 325
                    });
                    running = true;
                    ra.fade('out');
                    break;
                    
                case 2: // Seite 2 zuklappen
                    self.toTop(els['page-1-2']);
                    self.toTop(els['page-2-2']);
                    els['page-1-2'].set('morph', {
                        duration: 500
                    });
                    els['page-2-2'].set('morph', {
                        duration: 250
                    });
                    els['page-1-2'].setStyles({
                        left: 975,
                        width: 0,
                        'background-position': 0
                    });
                    els['page-1-2'].morph({
                        left: 325,
                        width: 325
                    });
                    els['page-2-2'].morph({
                        width: 0
                    });
                    ra.fade.delay(250, ra, ['in']);
                    running = true;
                    break;
                    
                case 3: // Seite 1 zuklappen
                    self.toTop(els['front']);
                    self.toTop(els['page-1-1']);
                    els['front'].set('morph', {
                        duration: 500
                    });
                    els['page-1-1'].set('morph', {
                        duration: 250
                    });
                    els['front'].setStyles({
                        left: 0,
                        width: 0,
                        'background-position': -350
                    });
                    els['page-1-1'].morph({
                        left: 325,
                        width: 0,
                        'background-position': -320
                    });
                    els['front'].morph({
                        left: 325,
                        width: 325,
                        'background-position': 0
                    });
                    la.fade.delay(250, la, ['in']);
                    ra.fade('out');
                    running = true;
                    i = 0;
                    break;
            }
        });
    },
    
    toTop: function(el){
        el.setStyle('z-index', this.zIndex++);
    }
});


window.addEvent('domready', function(){
    
    new PageFlip($('pageflip'), ['front', 'page-1-1', 'page-1-2', 'page-2-1', 'page-2-2']);
    
});