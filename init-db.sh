#!/bin/bash
set -e

mysql -h db -u root -p root < usr/src/app/init-db.sql