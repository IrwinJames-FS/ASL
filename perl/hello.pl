#!/usr/bin/perl
use strict;
use warnings;
use POSIX qw(strftime);

my $formatted_date = strftime("%d/%m/%Y", localtime);
print "Perl says, Hello ASL!\n";
print "$formatted_date\n";