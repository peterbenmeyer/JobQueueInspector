Job Queue Inspector
===================

This MediaWiki extension shows how many jobs have been in the queue in a recent time frame.
Jobs includes "refresh links" and "replace text".  They create one job for each page to be updated, basically.
Those jobs can sit in the queue if $wgJobRunRate is low and the wiki doesn't get much front-end traffic, that is, user clicks.

Update for this project:  show $wgJobRunRate

Make the extension naturally available to admins but probably not to others.

James Montalvo started this software on April 5, 2019 at EMWCon 2019

