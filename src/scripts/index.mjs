import './natr-element.mjs';
import levels from './levels.mjs';

const $levelSlider = document.getElementById('level-slider');
const $levelDescription = document.getElementById('level-description');
const $natr = document.getElementsByTagName('na-tr')[0];

$levelSlider.setAttribute('max', levels.length - 1);
function SyncLevel() {
	$natr.levelIndex = +$levelSlider.value;
	$levelSlider.value = $natr.levelIndex;
	$levelDescription.innerText = $natr.level.description;
};
$levelSlider.addEventListener('input', SyncLevel);
SyncLevel();