<template>
<div class="indicator-chart">
    <div class="set-size charts-container">
      <div class="header-chart">
        <div class="header-chart_left">
          <h3>{{config.title}} </h3>
        </div>
        <div class="header-chart_right">
          <img :src="require(`@/assets/img/${config.img}`)" alt="" />
        </div>
      </div>
      <div class="indicator_chart-content">
        <div class="pie-wrapper style-2" :class="'progress-'+ config.progress">
          <span class="label">
            {{config.progress}}
            <span class="smaller">%</span>
          </span>
          <div class="pie">
            <div class="left-side half-circle"></div>
            <div class="right-side half-circle"></div>
          </div>
          <div class="shadow"></div>
        </div>
        <div class="chart-content_text"><span>{{config.content.num}}</span> <span class="text" v-if="config.content.text">{{config.content.text}}</span> </div>
      </div>
    </div>
</div>
</template>

<script>
export default {
  props: {
    config: {
      type: Object
    }
  },
  data () {
    return {
      p: 0
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/sass/abstracts/_variable";
// -- vars
$bg-color: #556980;
$Primary: #247AF2;
$default-size: 0.6em;
$label-font-size: $default-size / 4;
$label-font-size-redo: $default-size * 4;
// -- mixins
@mixin size($width, $height) {
    height: $height;
    width: $width;
}

@mixin draw-progress($progress, $color) {
    .pie {
        //transition: 0.3s ease-in-out all;
        .half-circle {
            border-color: $color;
        }
        .left-side {
            transform: rotate($progress * 3.6deg);
        }
        @if $progress <=50 {
            .right-side {
                display: none;
            }
        }
        @else {
            clip: rect(auto, auto, auto, auto);
            .right-side {
                transform: rotate(180deg);
            }
        }
    }
}

@mixin draw-progress--solid($progress, $color, $bg-color) {
    background: linear-gradient(to right, $color 50%, $bg-color 50%);
    &:before {
        @if $progress <=50 {
            background: $bg-color;
            transform: rotate((100 - (50 - $progress)) / 100 * 360deg * -1);
        }
        @else {
            background: $color;
            transform: rotate((100 - $progress) / 100 * 360deg);
        }
    }
}

.indicator-chart .charts-container:after{
    content: none !important;
}
.indicator-chart {
    height: fit-content;
    padding: 23px;
    border: 1px solid rgba(0, 0, 0, 0.06);
    box-sizing: border-box;
    border-radius: 12px;
    margin: 0 5px;
    width: 250px;
    transition: 0.3s ease all;
    &:hover {
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.06);
    }
    .charts-container {
        width: 100%;
        height: 145px;
        // gap: 30%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    h3 {
        width: 100%;
        max-width: 144px;
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 28px;
        text-align: right;
        color: $river-bed;
    }
    .header-chart {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        // margin-bottom: 40px;
        .header-chart_left {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            .tag {
                height: 28px;
                width: fit-content;
                background: #F5F5F5;
                padding: 4px 8px;
                color: $primary;
                border-radius: 4px;
                margin: 8px 0px;
            }
        }
        .header-chart_right {
            width: 66px;
            height: 66px;
            background-color: #fff;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
                width: 40px;
                height: 40px;
                filter: invert(99%) sepia(0%) saturate(5484%) hue-rotate(214deg) brightness(108%) contrast(73%);
            }
        }
    }
    .pie-wrapper .label {
        display: flex;
        flex-direction: row-reverse;
        font-size: 18px;
    }
    .indicator_chart-content {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: flex-end;
        // font-size: 15px;
        .chart-content_text {
            width: 130px;
            font-style: normal;
            font-weight: 700;
            font-size: 18px;
            line-height: 25px;
            text-align: left;
            color: $tertiary;
            span.text {
                font-style: normal;
                font-weight: 400;
                font-size: 14px;
                line-height: 28px;
                /* identical to box height, or 200% */
                text-align: center;
                /* Text */
                color: #3e4c5980;
                opacity: 0.5;
            }
        }
    }
    .footer {
        display: flex;
        flex-direction: column;
        .row {
            display: flex;
            justify-content: space-between;
        }
        .column {
            display: flex;
            align-items: center;
            justify-content: center;
            .title {
                font-style: normal;
                font-weight: 400;
                font-size: 12px;
                margin-right: 5px;
                line-height: 28px;
                text-align: right;
                color: $river-bed;
            }
            .text {
                font-style: normal;
                font-weight: 700;
                font-size: 12px;
                line-height: 28px;
                color: $river-bed;
            }
        }
    }
    .set-size {
        font-size: 1em;
    }
    .charts-container {
        &:after {
            clear: both;
            content: '';
            display: table;
        }
    }
    .square {
        width: 16px;
        height: 16px;
    }
    .positive_square {
        background-color: $primary;
    }
    .negative_square {
        background-color: $tertiary;
    }
    .pie-wrapper {
        @include size($default-size, $default-size);
        //float: left;
        // margin: 30px auto 20px auto;
        position: relative;
        font-size: 100px;
        display: inline-block;
        //transition: 1s ease-in all;
        //margin-right: -20px;
        //margin-top: 60px;
        &:nth-child(3n + 1) {
            clear: both;
        }
        .skill {
            font-size: 20px;
            margin-top: 15px;
            color: #614e39;
        }
        &:focus .skill {
            font-weight: bold;
            //transition: 1s ease-in-out all;
        }
        &:hover .skill {
            font-weight: bold;
            //transition: 1s ease-in-out all;
        }
        .skill-web {
            font-size: 15px;
            margin-top: 15px;
        }
        .pie {
            @include size(100%, 100%);
            clip: rect(0, $default-size, $default-size, $default-size / 2);
            left: 0;
            position: absolute;
            top: 0;
            .half-circle {
                @include size(100%, 100%);
                border: 0.08em solid #3498db;
                border-radius: 50%;
                clip: rect(0, $default-size / 2, $default-size, 0);
                left: 0;
                position: absolute;
                top: 0;
            }
        }
        .label {
            background: $bg-color;
            border-radius: 50%;
            bottom: $label-font-size-redo / 10;
            color: #fff;
            cursor: default;
            display: flex;
            font-size: $label-font-size;
            // left: $label-font-size-redo / 10;
            line-height: $label-font-size-redo * .70;
            position: absolute;
            right: $label-font-size-redo / 2.3;
            text-align: center;
            top: $label-font-size-redo / 1.9;
        }
        .shadow {
            @include size(100%, 100%);
            border: 0.08em solid rgba(0, 0, 0, 0.05);
            border-radius: 50%;
        }
        &.style-2 {
            .label {
                background: none;
                color: #5f6b6b;
                font-weight: bold;
            }
        }
        &.progress-100 {
            @include draw-progress(100, $Primary);
        }
        &.progress-99 {
            @include draw-progress(99, $Primary);
        }
        &.progress-98 {
            @include draw-progress(98, $Primary);
        }
        &.progress-97 {
            @include draw-progress(97, $Primary);
        }
        &.progress-96 {
            @include draw-progress(96, $Primary);
        }
        &.progress-95 {
            @include draw-progress(95, $Primary);
        }
        &.progress-94 {
            @include draw-progress(94, $Primary);
        }
        &.progress-93 {
            @include draw-progress(93, $Primary);
        }
        &.progress-92 {
            @include draw-progress(92, $Primary);
        }
        &.progress-91 {
            @include draw-progress(91, $Primary);
        }
        &.progress-90 {
            @include draw-progress(90, $Primary);
        }
        &.progress-89 {
            @include draw-progress(89, $Primary);
        }
        &.progress-88 {
            @include draw-progress(88, $Primary);
        }
        &.progress-97 {
            @include draw-progress(87, $Primary);
        }
        &.progress-86 {
            @include draw-progress(86, $Primary);
        }
        &.progress-85 {
            @include draw-progress(85, $Primary);
        }
        &.progress-84 {
            @include draw-progress(84, $Primary);
        }
        &.progress-83 {
            @include draw-progress(83, $Primary);
        }
        &.progress-82 {
            @include draw-progress(82, $Primary);
        }
        &.progress-81 {
            @include draw-progress(81, $Primary);
        }
        &.progress-80 {
            @include draw-progress(80, $Primary);
        }
        &.progress-79 {
            @include draw-progress(79, $Primary);
        }
        &.progress-78 {
            @include draw-progress(78, $Primary);
        }
        &.progress-77 {
            @include draw-progress(77, $Primary);
        }
        &.progress-76 {
            @include draw-progress(76, $Primary);
        }
        &.progress-75 {
            @include draw-progress(75, $Primary);
        }
        &.progress-74 {
            @include draw-progress(74, $Primary);
        }
        &.progress-73 {
            @include draw-progress(73, $Primary);
        }
        &.progress-72 {
            @include draw-progress(72, $Primary);
        }
        &.progress-71 {
            @include draw-progress(71, $Primary);
        }
        &.progress-70 {
            @include draw-progress(70, $Primary);
        }
        &.progress-69 {
            @include draw-progress(69, $Primary);
        }
        &.progress-68 {
            @include draw-progress(68, $Primary);
        }
        &.progress-67 {
            @include draw-progress(67, $Primary);
        }
        &.progress-66 {
            @include draw-progress(66, $Primary);
        }
        &.progress-65 {
            @include draw-progress(65, $Primary);
        }
        &.progress-64 {
            @include draw-progress(64, $Primary);
        }
        &.progress-63 {
            @include draw-progress(63, $Primary);
        }
        &.progress-62 {
            @include draw-progress(62, $Primary);
        }
        &.progress-61 {
            @include draw-progress(61, $Primary);
        }
        &.progress-60 {
            @include draw-progress(60, $Primary);
        }
        &.progress-59 {
            @include draw-progress(59, $Primary);
        }
        &.progress-58 {
            @include draw-progress(58, $Primary);
        }
        &.progress-57 {
            @include draw-progress(57, $Primary);
        }
        &.progress-56 {
            @include draw-progress(56, $Primary);
        }
        &.progress-55 {
            @include draw-progress(55, $Primary);
        }
        &.progress-54 {
            @include draw-progress(54, $Primary);
        }
        &.progress-53 {
            @include draw-progress(53, $Primary);
        }
        &.progress-52 {
            @include draw-progress(52, $Primary);
        }
        &.progress-51 {
            @include draw-progress(51, $Primary);
        }
        &.progress-50 {
            @include draw-progress(50, $Primary);
        }
        &.progress-49 {
            @include draw-progress(49, $Primary);
        }
        &.progress-48 {
            @include draw-progress(48, $Primary);
        }
        &.progress-47 {
            @include draw-progress(47, $Primary);
        }
        &.progress-46 {
            @include draw-progress(46, $Primary);
        }
        &.progress-45 {
            @include draw-progress(45, $Primary);
        }
        &.progress-44 {
            @include draw-progress(44, $Primary);
        }
        &.progress-43 {
            @include draw-progress(43, $Primary);
        }
        &.progress-42 {
            @include draw-progress(42, $Primary);
        }
        &.progress-41 {
            @include draw-progress(41, $Primary);
        }
        &.progress-40 {
            @include draw-progress(40, $Primary);
        }
        &.progress-39 {
            @include draw-progress(39, $Primary);
        }
        &.progress-38 {
            @include draw-progress(38, $Primary);
        }
        &.progress-37 {
            @include draw-progress(37, $Primary);
        }
        &.progress-36 {
            @include draw-progress(36, $Primary);
        }
        &.progress-35 {
            @include draw-progress(35, $Primary);
        }
        &.progress-34 {
            @include draw-progress(34, $Primary);
        }
        &.progress-33 {
            @include draw-progress(33, $Primary);
        }
        &.progress-32 {
            @include draw-progress(32, $Primary);
        }
        &.progress-31 {
            @include draw-progress(31, $Primary);
        }
        &.progress-30 {
            @include draw-progress(30, $Primary);
        }
        &.progress-29 {
            @include draw-progress(29, $Primary);
        }
        &.progress-28 {
            @include draw-progress(28, $Primary);
        }
        &.progress-27 {
            @include draw-progress(27, $Primary);
        }
        &.progress-26 {
            @include draw-progress(26, $Primary);
        }
        &.progress-25 {
            @include draw-progress(25, $Primary);
        }
        &.progress-24 {
            @include draw-progress(24, $Primary);
        }
        &.progress-23 {
            @include draw-progress(23, $Primary);
        }
        &.progress-22 {
            @include draw-progress(22, $Primary);
        }
        &.progress-21 {
            @include draw-progress(21, $Primary);
        }
        &.progress-20 {
            @include draw-progress(20, $Primary);
        }
        &.progress-19 {
            @include draw-progress(19, $Primary);
        }
        &.progress-18 {
            @include draw-progress(18, $Primary);
        }
        &.progress-17 {
            @include draw-progress(17, $Primary);
        }
        &.progress-16 {
            @include draw-progress(16, $Primary);
        }
        &.progress-15 {
            @include draw-progress(15, $Primary);
        }
        &.progress-14 {
            @include draw-progress(14, $Primary);
        }
        &.progress-13 {
            @include draw-progress(13, $Primary);
        }
        &.progress-12 {
            @include draw-progress(12, $Primary);
        }
        &.progress-11 {
            @include draw-progress(11, $Primary);
        }
        &.progress-10 {
            @include draw-progress(10, $Primary);
        }
        &.progress-9 {
            @include draw-progress(9, $Primary);
        }
        &.progress-8 {
            @include draw-progress(8, $Primary);
        }
        &.progress-7 {
            @include draw-progress(7, $Primary);
        }
        &.progress-6 {
            @include draw-progress(6, $Primary);
        }
        &.progress-5 {
            @include draw-progress(5, $Primary);
        }
        &.progress-4 {
            @include draw-progress(4, $Primary);
        }
        &.progress-3 {
            @include draw-progress(3, $Primary);
        }
        &.progress-2 {
            @include draw-progress(2, $Primary);
        }
        &.progress-1 {
            @include draw-progress(1, $Primary);
        }
        &.progress-0 {
            @include draw-progress(0, $Primary);
        }
    }
    .pie-wrapper--solid {
        border-radius: 50%;
        overflow: hidden;
        &:before {
            border-radius: 0 100% 100% 0 / 50%;
            content: '';
            display: block;
            height: 100%;
            margin-left: 50%;
            transform-origin: left;
        }
        .label {
            background: transparent;
        }
        &.progress-65 {
            @include draw-progress--solid(65, #e67e22, $bg-color);
        }
        &.progress-25 {
            @include draw-progress--solid(25, #9b59b6, $bg-color);
        }
        &.progress-88 {
            @include draw-progress--solid(88, #3498db, $bg-color);
        }
    }
}

// -- selectors
*,
*:before,
*:after {
    box-sizing: border-box;
}

.selected {
    .indicator-chart .header-chart .header-chart_left .tag {
        background-color: #fff;
    }
    .indicator-chart{
        background: rgba(36, 122, 242, 0.1) !important;
        .header-chart_right {
            img {
                filter: invert(26%) sepia(16%) saturate(715%) hue-rotate(168deg) brightness(96%) contrast(86%);
            }
        }
    }
    .header-chart_right {
        img {
            filter: invert(26%) sepia(16%) saturate(715%) hue-rotate(168deg) brightness(96%) contrast(86%);
        }
    }
}
</style>
