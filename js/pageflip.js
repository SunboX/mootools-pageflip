window.addEvent('domready', function(){
    
    var container = $('pageflip');
    var images = ['front', 'page-1-1', 'page-1-2', 'page-2-1', 'page-2-2'];
    var els = [];
    
    var zIndex = 999;
    
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
                'z-index': zIndex--
            }
        }).inject(container);
        
        els[img].get('morph').addEvent('complete', function(){
            running = false;
        });
    });
    
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
                els['page-1-1'].setStyle('left', 650);
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
                /*
            case 2: // Seite 2 zuklappen
                els['page-1-2'].morph({
                    left: 325,
                    width: 325,
                    'background-position': 0
                });
                els['page-2-1'].morph({
                    width: 0
                });
                els['page-2-2'].morph({
                    left: 325,
                    width: 0
                });
                running = true;
                break;*/
        }
    });
});