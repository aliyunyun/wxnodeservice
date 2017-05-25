import Page from './page';
import Home from './modules/home';
import Albums from './modules/albums';
import AlbumSongs from './modules/albumSongs';
import Collection from './modules/collection';
import Internal from './modules/internal';
import LocalStation from './modules/localStation';
import Network from './modules/network';
import Player from './modules/player';
import Recent from './modules/recent';
import Tags from './modules/tags';
import NetworkMusic from './modules/networkMusic';
import BuildAlbum from './modules/buildAlbum';
import Anchors from './modules/anchors';
import AnchorAlbums from './modules/anchorAlbums';

var {Router, Route, hashHistory, IndexRedirect} = ReactRouter;

var RouterDom;
export default RouterDom = (
	<Router history={hashHistory}>
        <Route path="/" component={Page} >
            <Route path="/home" component={Home} ></Route>
            <Route path="/albums">
                <IndexRedirect to="index" />
                <Route path="index" component={Albums} />
                <Route path="songs/:id/:name/:img" component={AlbumSongs} />
                <Route path='build/:id/:name' component={BuildAlbum} />
            </Route>
            <Route path='/collection' component={Collection} />
            <Route path='/recent' component={Recent} />
            <Route path='/internal' component={Internal} />
            <Route path='/network'>
                <IndexRedirect to="index" />
                <Route path="index" component={Network} />
                <Route path="tags/:id/:title" component={Tags} />
                
                <Route path='anchors/:id/:title' component={Anchors} />
                <Route path="anchorAlbums/:id/:title" component={AnchorAlbums} />

                <Route path='albums/:id/:title/:playsCount/:tracksCount' component={NetworkMusic} />
            </Route>
            <Route path='/localStation' component={LocalStation} />
            <Route path='/player' component={Player} />

        </Route>
    </Router>
)

