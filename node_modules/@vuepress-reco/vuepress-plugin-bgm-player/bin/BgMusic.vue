<template>
  <div class="reco-bgm-panel">
    <!-- 播放器 -->
    <audio id="bgm" :src="audio[curIndex].url" ref="bgm" @ended="bgmEnded" @canplay="playReady" @timeupdate="timeUpdate"></audio>
    <module-transition :position="floatPosition">
      <div v-show="isFloat" @click="changeBgmInfo(false)" class="reco-float-box" :style="floatStyle">
        <img :src="audio[curIndex].cover">
      </div>
    </module-transition>
    <module-transition>
      <div class="reco-bgm-box" v-show="!isFloat" :style="panelPosition">
        <!-- 封面 -->
        <div class="reco-bgm-cover" @click="changeBgmInfo(false)" :style="`background-image:url(${audio[curIndex].cover})`">
          <!-- mini操作栏 -->
          <div v-show="isMini" class="mini-operation">
            <i v-show="this.curPlayStatus === 'playing' && isMini" @click.stop="pauseBgm" class="reco-bgm reco-bgm-pause"></i>
            <i v-show="this.curPlayStatus === 'paused' && isMini" @click.stop="playBgm" class="reco-bgm reco-bgm-play"></i>
          </div>
          <!-- 错误信息显示 -->
          <div v-show="isFault" class="falut-message">
            播放失败
          </div>
        </div>
        <module-transition duration=".15">
          <!-- 歌曲信息栏 -->
          <div v-show="!isMini" class="reco-bgm-info">
            <!-- 歌曲名 -->
            <div class="info-box"><i class="reco-bgm reco-bgm-music music"></i>{{ audio[curIndex].name }}</div>
            <!-- 艺术家名 -->
            <div class="info-box"><i class="reco-bgm reco-bgm-artist"></i>{{ audio[curIndex].artist }}</div>
            <!-- 歌曲进度条 -->
            <div class="reco-bgm-progress">
              <div class="progress-bar" @click="progressJump">
                <div class="bar" ref="pbar"></div>
              </div>
            </div>
            <!-- 歌曲操作栏 -->
            <div class="reco-bgm-operation">
              <i class="reco-bgm reco-bgm-last last" @click="playLast"></i>
              <i v-show="curPlayStatus === 'playing'" @click="pauseBgm" class="reco-bgm reco-bgm-pause pause"></i>
              <i v-show="curPlayStatus === 'paused'" ref="play" @click="playBgm" class="reco-bgm reco-bgm-play play"></i>
              <i class="reco-bgm reco-bgm-next next" @click="playNext"></i>
              <i v-show="!isMute" @click="muteBgm" class="reco-bgm reco-bgm-volume1 volume"></i>
              <i v-show="isMute" @click="unMuteBgm" class="reco-bgm reco-bgm-mute mute"></i>
              <div class="volume-bar" @click="volumeJump">
                <div class="bar" ref="vbar"></div>
              </div>
            </div>
          </div>
        </module-transition>
        <!-- 缩放按钮 -->
        <module-transition duration=".15">
          <div v-show="!isMini" @click="changeBgmInfo(true)" class="reco-bgm-left-box">
            <i class="reco-bgm reco-bgm-left" ></i>
          </div>
        </module-transition>
      </div>
    </module-transition>
  </div>
</template>

<script>
let InterVal
// 歌曲封面的旋转角度
let rotateVal = 0
// 歌曲封面的旋转
function rotate () {
  InterVal = setInterval(function () {
    const cover = document.querySelector('.reco-bgm-cover')
    const btn = document.querySelector('.mini-operation')
    const fm = document.querySelector('.falut-message')
    rotateVal += 1
    // 设置旋转属性(顺时针)
    cover.style.transform = 'rotate(' + rotateVal + 'deg)'
    // 设置旋转时的动画  匀速0.1s
    cover.style.transition = '0.1s linear'
    // 设置旋转属性(逆时针)
    btn.style.transform = 'rotate(-' + rotateVal + 'deg)'
    // 设置旋转时的动画  匀速0.1s
    btn.style.transition = '0.1s linear'
    // 设置旋转属性(逆时针)
    fm.style.transform = 'rotate(-' + rotateVal + 'deg)'
    // 设置旋转时的动画  匀速0.1s
    fm.style.transition = '0.1s linear'
  }, 100)
}
import volume from './mixins/volume.js'
import ModuleTransition from './ModuleTransition'
export default {
  mixins: [volume],
  components: {
    ModuleTransition
  },
  mounted () {
    if (this.floatPosition === 'left') {
      this.floatStyle = {
        ...this.floatStyle,
        'left': '0',
        'border-top-right-radius': '20px',
        'border-bottom-right-radius': '20px'
      }
    } else {
      this.floatStyle = {
        ...this.floatStyle,
        'right': '0',
        'border-top-left-radius': '20px',
        'border-bottom-left-radius': '20px'
      }
    }
    // autoShrink时隐藏歌曲信息
    if (this.autoShrink) this.changeBgmInfo(true)
  },
  data () {
    return {
      panelPosition: POSITION,
      curIndex: 0,
      curPlayStatus: 'paused',
      audio: AUDIOS,
      autoplay: AUTOPLAY,
      isFloat: false,
      isMini: false,
      firstLoad: true,
      isMute: false,
      isFault: false,
      floatPosition: FLOAT_POSITION,
      floatStyle: FLOAT_STYLE,
      autoShrink: AUTO_SHRINK,
      shrinkMode: SHRINK_MODE
    }
  },
  watch: {
    'curPlayStatus': function (newVal) {
      if (newVal === 'playing') {
        rotate()
      } else {
        clearInterval(InterVal)
      }
    }
  },
  methods: {
    // 显示或隐藏歌曲信息
    changeBgmInfo (bool) {
      const isMobile = !!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
      if (isMobile || this.shrinkMode === 'float') {
        this.isFloat = bool
      } else if (!isMobile && this.shrinkMode === 'mini') {
        this.isMini = bool
      }
    },
    // audio canplay回调事件
    playReady () {
      // 第一次加载时初始化音量条并处理自动播放事件
      if (this.firstLoad) {
        if (this.getVolume()) {
          const percent = this.getVolume()
          this.$refs.vbar.style.width = percent * 100 + '%'
          this.$refs.bgm.volume = percent
        } else {
          const vbar_width = this.$refs.bgm.volume * 100 + '%'
          this.$refs.vbar.style.width = vbar_width
        }
        this.firstLoad = false
        /* 自动播放的处理
        if (this.autoplay) {
          let playPromise = this.$refs.bgm.play()
          if (playPromise !== undefined) {
            playPromise.then(res => {
            }).catch(err => {
              console.log('自动播放失败')
            })
          }
        } */
      }
      // 播放状态下歌曲准备完成立即播放
      if (this.curPlayStatus === 'playing') {
        this.playBgm()
      }
    },
    // 暂停
    pauseBgm () {
      this.$refs.bgm.pause()
      this.curPlayStatus = 'paused'
    },
    // 播放
    playBgm () {
      const playPromise = this.$refs.bgm.play()
      if (playPromise !== undefined) {
        playPromise.then(res => {
          if (this.isFault) {
            this.isFault = false
          }
        // eslint-disable-next-line handle-callback-err
        }).catch(err => {
          console.log(err)
          // 播放异常时显示播放失败并暂停播放
          this.isFault = true
          this.pauseBgm()
        })
      }
      // this.$refs.bgm.play()
      this.curPlayStatus = 'playing'
    },
    // 播放下一首
    playNext () {
      this.$refs.pbar.style.width = 0
      this.isFault = false
      if (this.curIndex >= this.audio.length - 1) {
        this.curIndex = 0
      } else {
        this.curIndex++
      }
    },
    // 播放上一首
    playLast () {
      this.$refs.pbar.style.width = 0
      this.isFault = false
      if (this.curIndex <= 0) {
        this.curIndex = this.audio.length - 1
      } else {
        this.curIndex--
      }
    },
    // bgm结束时自动下一首
    bgmEnded () {
      this.$refs.pbar.style.width = 0
      this.playNext()
    },
    // 更新歌曲进度条
    timeUpdate () {
      const total_time = this.$refs.bgm.duration
      const cur_time = this.$refs.bgm.currentTime
      const bar_width = cur_time / total_time * 100 + '%'
      this.$refs.pbar.style.width = bar_width
    },
    // 点击进度条跳播
    progressJump (e) {
      const total_time = this.$refs.bgm.duration
      const percent = e.offsetX / 150
      // 歌曲未加载完成时点击进度条的错误处理
      if (isNaN(total_time)) return
      this.$refs.bgm.currentTime = percent * total_time
    },
    // 点击音量条修改音量
    volumeJump (e) {
      const percent = e.offsetX / 57
      if (percent >= 0 && percent <= 1) {
        this.isMute = !(percent > 0)
        this.$refs.vbar.style.width = percent * 100 + '%'
        this.$refs.bgm.volume = percent
        this.setVolume(this.$refs.bgm.volume)
      }
    },
    // 静音
    muteBgm () {
      this.isMute = true
      this.setVolume(this.$refs.bgm.volume)
      this.$refs.vbar.style.width = 0
      this.$refs.bgm.volume = 0
    },
    // 取消静音
    unMuteBgm () {
      this.isMute = false
      if (this.getVolume()) {
        const percent = this.getVolume()
        this.$refs.vbar.style.width = percent * 100 + '%'
        this.$refs.bgm.volume = percent
      } else {
        this.$refs.vbar.style.width = '100%'
        this.$refs.bgm.volume = 1
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@require './assets/iconfont/iconfont.css'
@import './styles/index.styl'
</style>
