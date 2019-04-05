<?php

class SpecialJobQueueGraph extends SpecialPage {

	public $mMode;

	public function __construct() {
		parent::__construct(
			"JobQueueGraph", //
			"",  // rights required to view
			true // show in Special:SpecialPages
		);
	}

	public function execute( $parser = null ) {
		$output = $this->getOutput();
		$output->addHTML( '<div style="width:100%;"><canvas id="canvas"></canvas></div>' );
		$output->addModules( 'ext.jobqueueinspector.jobqueue' );
	}
}
