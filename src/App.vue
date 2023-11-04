<template>
  <router-view />
</template>

<script>
import ApiService from "@/services/ApiService";

export default {
  name: "App",
  provide() {
    let provider = {};
    Object.defineProperty(provider, "appSettings", {
      iteratable: true,
      get: () => this.appSettings,
    });
    return provider;
  },
  data() {
    return {
      appSettings: {},
    };
  },

};
</script>

<style>
.v-menu__content .v-list--nav .v-list-item {
  padding: 0 15px !important;
  margin: 0 0.3125rem;
  margin-bottom: 0 !important;
  min-height: 38px;
  border-radius: 2px;
  min-width: 80px;
}

.v-list-item.primary.v-list-item--active {
  background-color: #1a5f30 !important;
  border-color: #1a5f30 !important;
  color: #fff !important;
}

.searchbox {
  background-color: white;
  margin-top: -3px !important;
}

.button-color-primary {
  background-color: #1a5f30;
}

.v-card__title {
  background-color: #ddd;
  margin-top: 0 !important;
}

.v-data-table .v-data-table-header {
  background-color: #bbdda5 !important;
}

.v-data-table td {
  font-size: 14px !important;
  font-weight: 300;
  padding: 12px 8px;
}

.v-data-table th.sortable:hover {
  font-size: 14px !important;
  font-weight: 600 !important;
}

.v-data-table th.sortable {
  font-size: 14px !important;
  font-weight: 600 !important;
}

.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background: transparent !important;
}

.component-title {
  background-color: #bbdda5;
  margin: 0;
  color: #1a5f30;
  font-size: 16px !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

.component-title-color {
  color: #1a5f30;
}

.table-head {
  color: #1a5f30;
}

.table-customized {
  border-collapse: collapse;
  width: 100%;
  color: #1a5f30;
}

.table-customized {
  border-collapse: collapse;
  width: 100%;
  color: #1a5f30;
}

.table-customized .mw-150 {
  min-width: 150px;
}

.table-customized .mw-100 {
  min-width: 150px;
  text-align: left;
}

.table-customized .mw-100 {
  min-width: 150px;
  text-align: left;
}

.table-customized .table-head-bg {
  background-color: #bbdda5;
}

.table-customized .table-head-ais {
  background-color: #bbdda5;
}

.table-customized .table-subhead-bg {
  background-color: #fff9e7;
}

.table-customized .table-subhead-training {
  background-color: #e2f0db;
}

.table-customized .table-bg-mute {
  background-color: #ddd;
}

.table-customized th {
  padding: 10px;
}

.table-customized td {
  font-size: 12px;
  padding: 6px;
}

.table-customized th {
  font-size: 14px;
  font-weight: 600;
}

.table-customized th,
.table-customized td {
  border: 1px solid #bbdda5;
  text-align: center;
}

.table-customized .k {
  font-size: 14px;
  border: 1px solid #bbdda5;
  text-align: left;
  color: #000;
}

.text-center-force input,
.text-center-force textarea {
  text-align: center;
  color: #000;
}

.text-right-force input,
.text-right-force textarea {
  text-align: right;
  color: #000;
}

.v-text-field input {
  font-size: 14px;
}

.clearfix {
  clear: both;
  width: 100%;
}

.title-left {
  display: flex;
  min-height: 4rem;
  float: left !important;
  align-items: center;
}

.title-left .title-text {
  margin: 0;
}

.title-right {
  display: flex;
  min-height: 4rem;
  float: right !important;
  align-items: center;
}

.title-right button {
  margin: 0 !important;
}

.v-data-table table {
  border-collapse: collapse;
}

.v-data-table table th,
.v-data-table table td {
  border: 1px solid #bbdda5;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
  color: rgba(0, 0, 0, 0.6);
  font-size: 14px;
  font-weight: 600;
}

.customvcardtitle {
  background-color: #bbdda5 !important;
}

.dspp_subhed {
  background-color: #529868;
}

.swal2-title {
  margin: 0;
  padding: 0em 1em 0;
  font-size: 1.85em;
  font-weight: 600;
}

.swal2-html-container {
  margin: 0.3em 1.6em 0.3em;
  padding: 0;
}

.drop-menu {
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
  color: #212529;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  list-style: none;
  margin: 0.125rem 0 0;
  padding: 0.5rem 0;
  position: absolute;
  text-align: left;
}

.drop-menu-item {
  color: #212529;
  padding: 0.25rem 1.5rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.drop-menu-item:hover {
  background-color: #f4f6f6;
  cursor: pointer;
}

.z-index-1 {
  z-index: 1 !important;
}
</style>
