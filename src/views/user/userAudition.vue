<template>
<div>
  <nav class="flex items-center h-12">
      <div class="w-1/5 flex flex-wrap justify-center content-center h-10 border-2 ml-auto border-white rounded-sm cursor-pointer" @click="$refs.inputFile.click()">
        <div class="w-full flex">
            <div class="w-1/4 flex justify-center"><img :src="'/images/icons/camera.png'" class="h-6 ml-auto" alt="star"></div>
            <p class="w-full text-white tracking-wide text-lg ml-5 tracking-tight truncate">{{file.name}}</p>
        </div>
      </div>
      <img v-if="favorite == 0" :src="'/images/icons/4-layers.png'" class="w-6 m-6" alt="star" @click="favorite=1">
      <img v-else  :src="'/images/icons/Path_56@2x.png'" class="w-6 m-6" alt="star" @click="favorite=0">
    <div class="flex items-center border-l border-white text-white float-right cursor-pointer">
      <span class="mx-4">
        {{profile.details.first_name}} {{profile.details.last_name}}
      </span>
      <!-- <i class="material-icons mr-4">
        keyboard_arrow_down
      </i> -->
      <img
        :src="profile.image.url"
        class="w-12"
        alt="Avatar"
      >
    </div>
  </nav>
  <input
    ref="inputFile"
    accept=".mp4"
    type="file"
    hidden
    @change="handleFile"
  >
  <modal name="marketplace" :scrollable="true" height="auto">
    <div class="w-full shadow-lg border border-gray-300">
        <p class="text-center text-2xl text-purple font-bold" @click="show">Marketplaces</p>
        <div class="flex flex-wrap justify-center w-full">
            <div class="flex flex-wrap justify-center w-full">
              <base-input
                v-model="marketplaceSearch"
                name="marketplace"
                class="w-full px-2"
                type="add"
                placeholder="Search marketplaces"
                :custom-classes="['border-2', 'border-purple']"
                @input="filterMarketplaces"
              />
          </div>
        </div>
        <div class="m-4 cursor-pointer">
          <div v-for="data in marketplace" :key="data.id" :class="{'bg-purple': currentMarketplace.id == data.id}" class="flex flex-wrap justify-center text-left content-center w-full rounded-sm border-b-2 border-gray-500 mb-4" @click="selectMarketplace(data)">
            <p :class="{'text-white': currentMarketplace.id == data.id, 'text-purple': currentMarketplace.id != data.id}" class="w-1/2">{{data.title}}</p>
            <div class="flex flex-wrap justify-end w-1/2">
              <!-- <img src="/images/icons/garbage@3x.png" alt="Icon" class="h-6" @click="deleteTag(data)"> -->
            </div>
          </div>
        </div>
      </div>
  </modal>
 <multipane class="custom-resizer h-full " layout="vertical">
  <div class="pane bg-white overflow-scroll" :style="{ minWidth: '80%', width: '100%', maxWidth: '100%' }">
  <div class="flex flex-wrap  h-full">
    <div class="flex w-full">
      <div class="w-1/4 flex flex-wrap content-center justify-center calendar shadow-lg">
        <p class="text-center text-2xl text-purple font-bold">Availability</p>
          <v-date-picker :attributes="attrs" class="border-none" :select-attribute='selectAttribute' locale="en" mode='range' v-model="dates" show-caps is-inline  :rows="2" />
      </div>
      <div class="w-1/12"></div>
      <div class="w-1/4 shadow-lg">
        <p class="text-center text-2xl text-purple font-bold">Roles</p>
        <div class="flex flex-wrap justify-center">
            <div v-for="data in audition.roles" :key="data.id" class="text-center w-1/2 flex justify-center">
              <div>
                <div class="m-3 rounded-full flex items-center w-12 h-12 bg-cover" :class="{'button-detail': data.id == rol, 'bg-gray-400': data.id != rol}" :style="{ backgroundImage: 'url(' + data.image.url + ')' }">

                </div>
                <p class="text-purple text-xs justify-center w-16 font-bold tracking-tighter flex-1 ">
                  {{ data.name }}
                </p>
              </div>
            </div>
        </div>
      </div>
      <div class="w-1/12"></div>
      <div v-if="audition.online == 0" class="w-1/3 shadow-lg">
        <p class="text-center text-2xl text-purple font-bold">Team Feedback</p>
        <div class="flex flex-wrap justify-center">
            <div v-if="teamFeedback.length  == 0" class="text-purple font-bold h-full"> Not records created yet</div>
            <div
              v-for="data in teamFeedback"
              :key="data.id"
              class="text-center w-full flex justify-center"
            >
            <div>
              <div class="m-3 rounded-full flex items-center w-full h-12 ">
                <figure class="flex justify-center flex-wrap content-center w-8 h-8 border-2 border-purple rounded-sm">
                  <img
                    :src="'/images/icons/'+data.evaluation+'.png'"
                    alt="Icon"
                    class="content-center h-4"
                  >
                </figure>
                <p class="text-purple text-xs justify-center w-16 font-bold tracking-tighter flex-1 w-full">
                  Call Back
                </p>
                <div
                  class="py-1 px-5 border text-xs border-purple button-detail text-white font-bold uppercase mr-2 rounded-full cursor-pointer"
                >
                  {{ data.callback == 1? 'Yes' :  'No' }}
                </div>
                <p class="text-purple text-xs justify-center w-16 font-bold tracking-tighter flex-1 w-full">
                  Work On
                </p>
                <div
                  class="py-1 px-5 border text-xs border-purple button-detail text-white font-bold uppercase mr-2 rounded-full cursor-pointer"
                >
                  {{ data.work }}
                </div>
              </div>
            </div>
            </div>
          </div>
      </div>
      <div v-if="audition.online == 1" class="w-1/3 shadow-lg">
        <p class="text-center text-2xl text-purple font-bold">Audition Documents</p>
        <div class="flex flex-wrap justify-center">
            <div v-if="onlineMedia.length  == 0" class="text-purple font-bold h-full"> Not media added yet</div>
            <carousel
              class="flex flex-col mt-4 w-full"
              :per-page="1"
              :pagination-enabled="false"
            >
              <slide
              class="flex flex-wrap justify-center content-center mt-4 w-full p-3"
              v-for="data in onlineMedia" :key="data.id"
              >
                <div v-if="data.type == 'video'" class="container w-full rounded-lg shadow-lg overflow-hidden mb-3 shadow-lg ">
                  <div class="flex-col">
                      <video class="w-full" controls><source :src="data.url" type="video/mp4"></video>
                  </div>
                  <div class="p-2 bg-purple">
                      <span class="text-base truncate mb-3 text-white uppercase">{{ data.name }}</span>
                  </div>
                </div>
                <div v-if="data.type == 'doc'" class="flex m-3 content-center w-full h-16 flex justify-center">
                    <div class="flex justify-center w-9/12 button-detail rounded-lg  shadow-lg">
                      <div class="flex justify-center content-center flex-wrap w-1/2 h-full">
                        <img
                          src="/images/icons/pdf-icon@3x.png"
                          alt="Icon"
                          class="h-10"
                        >
                      </div>
                      <div class="flex content-center relative flex-wrap w-full h-full bg-white truncate">
                        <span class="text-center text-purple font-bold w-full truncate">{{ data.name }}</span>
                        <a target="_blank" :href="data.url">
                        <img
                          src="/images/icons/more-icon@3x.png"
                          alt="Icon"
                          class="h-6 absolute right-0 bottom-0"
                        >
                        </a>
                      </div>
                    </div>
                </div>
            </slide>
          </carousel>
            </div>
      </div>
    </div>
    <div class="flex w-full h-96 mt-16">
      <div class="w-1/3 shadow-lg border border-gray-300">
        <p class="text-center text-2xl text-purple font-bold">Instant Feedback</p>
        <div class="flex flex-wrap justify-center w-full">
            <div class="text-center w-full flex flex-wrap justify-center">
            <div>
              <div class="rounded-full flex flex-wrap justify-center content-center w-full h-12 mt-40">
                <div class="flex flex-wrap justify-center w-full">
                  <figure :class="{'border-2 border-purple': emoji==1}" class="flex justify-center flex-wrap content-center w-12 h-12 rounded-lg mt-3" @click="emoji=1">
                    <img
                      :src="'/images/icons/5.png'"
                      alt="Icon"
                      class="content-center h-8"
                    >
                  </figure>
                  <figure :class="{'border-2 border-purple': emoji==2}" class="flex justify-center flex-wrap content-center w-12 h-12 rounded-lg mt-3" @click="emoji=2">
                    <img
                      :src="'/images/icons/4.png'"
                      alt="Icon"
                      class="content-center h-8"
                    >
                  </figure>

                  <figure :class="{'border-2 border-purple': emoji==3}" class="flex justify-center flex-wrap content-center w-12 h-12 rounded-lg mt-3" @click="emoji=3">
                    <img
                      :src="'/images/icons/3.png'"
                      alt="Icon"
                      class="content-center h-8"
                    >
                  </figure>

                  <figure :class="{'border-2 border-purple': emoji==4}" class="flex justify-center flex-wrap content-center w-12 h-12 rounded-lg mt-3" @click="emoji=4">
                    <img
                      :src="'/images/icons/2.png'"
                      alt="Icon"
                      class="content-center h-8"
                    >
                  </figure>

                  <figure :class="{'border-2 border-purple': emoji==5}" class="flex justify-center flex-wrap content-center w-12 h-12 rounded-lg mt-3" @click="emoji=5">
                    <img
                      :src="'/images/icons/1.png'"
                      alt="Icon"
                      class="content-center h-8"
                    >
                  </figure>

                </div>
                <div class="flex flex-wrap justify-center content-center w-full">
                  <p class="text-purple justify-center w-16 font-bold tracking-tighter flex-1 w-full text-xl font-bold tracking-wider">
                    Call Back
                  </p>
                  <div class="flex flex-wrap justify-center content-center w-full">
                    <div class="container flex w-1/2 mt-3" @click="callback = 1">
                      <div class="flex w-full text-center justify-center flex-wrap">
                        <div :class="{'button-detail': callback == 1}" class="m-3 bg-white content-center border border-purple rounded-full w-32 h-10 flex items-center">
                          <p :class="{'text-white': callback == 1, 'text-purple': callback != 1}" class="text-white text-sm font-bold content-center tracking-tighter flex-1">
                            Yes
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="container flex w-1/2 mt-3">
                      <div class="flex w-full text-center justify-center flex-wrap" @click="callback = 0">
                        <div :class="{'button-detail': callback == 0}" class="m-3 content-center rounded-full border border-purple bg-white w-32 h-10 flex items-center">
                          <p :class="{'text-white': callback == 0, 'text-purple': callback != 0}" class=" text-sm font-bold content-center tracking-tighter flex-1">
                            No
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex flex-wrap justify-center content-center w-full">
                  <p class="text-purple justify-center w-16 font-bold tracking-tighter flex-1 w-full text-xl font-bold tracking-wider">
                    Work On
                  </p>
                  <div class="flex flex-wrap justify-center content-center w-full">
                    <div class="container flex w-1/4 mt-3">
                      <div class="flex w-full text-center justify-center flex-wrap">
                        <div :class="{'button-detail': workon == 1}" class="m-3 content-center rounded-full border border-purple red-light w-20 h-10 flex items-center bg-white"  @click="workon = 1">
                          <p :class="{'text-white': workon == 1 , 'text-purple': workon != 1}" class="text-sm font-bold content-center tracking-tighter flex-1">
                            Vocals
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="container flex w-1/4 mt-3">
                      <div class="flexw-full text-center justify-center flex-wrap">
                        <div :class="{'button-detail': workon == 2}" class="m-3 content-center rounded-full border border-purple bg-white w-20 h-10 flex items-center"  @click="workon = 2">
                          <p :class="{'text-white': workon == 2 , 'text-purple': workon != 2}" class="text-sm font-bold content-center tracking-tighter flex-1">
                            Acting
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="container flex w-1/4 mt-3">
                      <div class="flexw-full text-center justify-center flex-wrap">
                        <div :class="{'button-detail': workon == 3}" class="m-3 content-center rounded-full border border-purple bg-white w-20 h-10 flex items-center"  @click="workon = 3">
                          <p :class="{'text-white': workon == 3 , 'text-purple': workon != 3}" class="text-sm font-bold content-center tracking-tighter flex-1">
                            Dancing
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex flex-wrap justify-center content-center w-full">
                  <base-input
                  v-model="form.comment"
                    name="tag"
                    class="w-full px-2 mb-10"
                    type="add"
                    placeholder="Add Comment"
                    :custom-classes="['border-2', 'border-purple']"
                  />
                </div>
              </div>
            </div>
            </div>
          </div>
      </div>
      <div class="w-1/12"></div>
      <div class="w-1/4 shadow-lg border border-gray-300 overflow-auto">
        <p class="text-center text-2xl text-purple font-bold">Tags</p>
        <div class="flex flex-wrap justify-center w-full">
            <base-input
                v-model="tag"
                name="tag"
                class="w-full px-2"
                type="add"
                placeholder="Add Tags"
                :custom-classes="['border-2', 'border-purple']"
                @added="setTags"
              />
        </div>
        <div class="m-4">
          <div v-for="data in tags" :key="data.id" class="flex flex-wrap justify-center text-left content-center w-full border-b-2 border-gray-500 mb-4">
            <p class="text-purple w-1/2">{{data.title}}</p>
            <div class="flex flex-wrap justify-end w-1/2">
              <img src="/images/icons/garbage@3x.png" alt="Icon" class="h-6" @click="deleteTag(data)">
            </div>
          </div>
        </div>
      </div>
      <div class="w-1/12"></div>
      <div class="w-1/4 shadow-lg border border-gray-300 overflow-auto">
        <p class="text-center text-2xl text-purple font-bold">Recommendation</p>
        <div class="flex flex-wrap justify-center w-full">
            <div class="flex flex-wrap justify-center w-full">
              <base-input
                v-model="marketplaceSearch"
                name="marketplace"
                class="w-full px-2"
                type="add"
                @click.native="show"
                placeholder="Search marketplaces"
                :custom-classes="['border-2', 'border-purple']"
                @input="filterMarketplaces"
              />
          </div>
        </div>
        <div class="m-4">
          <div v-for="data in recommendations" :key="data.id" class="flex flex-wrap justify-center text-left content-center w-full border-b-2 border-gray-500 mb-4">
            <p class="text-purple w-1/2">{{data.markeplace.title}}</p>
            <div class="flex flex-wrap justify-end w-1/2">
              <img src="/images/icons/garbage@3x.png" alt="Icon" class="h-6" @click="deleteRecommended(data)">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  <multipane-resizer class="mt-96 bg-purple h-20"></multipane-resizer>
  <div class="pane relative" :style="{ flexGrow: 1 }">
    <div class="absolute" v-for="data in currentUser" :key="data.id">
      <div class="flex flex-wrap content-center justify-center text-center">
      <img
        :src="data.image"
        alt="Icon"
        class="-ml-3"
      >
      <p class="text-purple text-xl font-bold mt-4 w-full">{{data.name}}</p>
      <p class="text-purple text-m font-bold mt-2 w-full">Test City</p>
      <div class="flex w-full justify-start mt-12">
        <img
          :src="'/images/icons/person.png'"
          alt="Icon"
          class="content-center h-8"
        >
        <p class="text-purple text-m text-left ml-4 tracking-wide font-semibold w-1/2">Test City</p>
      </div>
      <div class="flex w-full justify-start mt-12">
        <img
          :src="'/images/icons/icon.png'"
          alt="Icon"
          class="content-center h-8"
        >
        <p class="text-purple text-m text-left ml-4 tracking-wide font-semibold w-1/2">Credit</p>
      </div>
      <div class="flex w-full justify-start mt-12">
        <img
          :src="'/images/icons/book.png'"
          alt="Icon"
          class="content-center h-8"
        >
        <p class="text-purple text-m text-left ml-4 tracking-wide font-semibold w-1/2">Education & Training</p>
      </div>
      <div class="flex w-full justify-start mt-12">
        <img
          :src="'/images/icons/12-layers.png'"
          alt="Icon"
          class="content-center h-8"
        >
        <p class="text-purple text-m text-left ml-4 tracking-wide font-semibold w-1/2">Appearance</p>
      </div>
      <div class="flex flex-wrap justify-center mt-12 w-full cursor-pointer" v-if="audition.status!=2">
        <div class="flex w-1/2" @click="saveFeedback">
          <div class="flex w-full text-center justify-center flex-wrap">
            <div class="m-3 button-detail content-center border border-purple rounded-full w-32 h-10 flex items-center">
              <p class="text-white text-sm font-bold content-center tracking-tighter flex-1">
                Save
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    </div>
  </div>
</multipane>
</div>
</template>

<script>

import { mapActions, mapState, mapGetters } from 'vuex';
import { Multipane, MultipaneResizer } from 'vue-multipane';
import { Calendar } from 'vue-sweet-calendar'
import axios from 'axios';
import moment from "moment";
import firebase from 'firebase/app';
import 'firebase/storage';
import uuid from 'uuid/v1';
import 'vue-sweet-calendar/dist/SweetCalendar.css'

export default {
  // ...
  components: {
    Multipane,
    MultipaneResizer,
    Calendar
  },
  data() {
    return {
      isLoading: true,
      rol:'',
      emoji:3,
      callback: 1,
      favorite:0,
      attrs: [],
      slot:'',
      tag:'',
      recommendation:'',
      workon:1,
      currentMarketplace:'',
      marketplaceSearch:'',
      currentUser:[],
      form:{},
      dates:{},
      file:{
        name:'Record Audition',
      },
      selectAttribute: {
        bar: true,
        color: 'red'
      },
    };
  },
  computed: {
    ...mapState('audition', ['audition', 'userList', 'teamFeedback', 'onlineMedia']),
    ...mapState('user', ['user']),
    ...mapState('feedback', ['feedback', 'tags', 'marketplace', 'recommendations']),
    ...mapState('profile', {profile:'user', calendar:'calendar', contract:'contract'}),
  },
  async mounted() {
    await this.fetchAuditionData(this.$route.params.audition);
    await this.fetchUserList(this.$route.params.round);
    await this.fetchTags({"round": this.$route.params.round, "user": this.$route.params.id,});
    await this.fetchRecommendation({"round": this.$route.params.audition, "user": this.$route.params.id,});
    await this.fetchOnlineMedia({"round": this.$route.params.round, "user": this.$route.params.id,});
    let feedback = {
      user:this.$route.params.id,
      round:this.$route.params.round
    };
    await this.fetchUserFeedback(feedback);
    let test = Object.keys(this.feedback).length;
    if(Object.keys(this.feedback).length>0){
      for(data in this.feedback){
        this.workon = this.feedback.work == 'vocals' ? 1 :this.feedback.work == 'acting' ? 2 : 3;
        this.favorite = this.feedback.favorite;
        this.emoji = this.feedback.evaluation;
        this.callback = this.feedback.callback == 1 ?true:false;
        this.form.comment = this.feedback.comment;
      }
    }


    this.currentUser = this.userList.filter(userList => userList.user_id == this.$route.params.id);
    if(this.currentUser != ""){
      this.slot = this.currentUser[0].slot_id;
      this.rol = this.currentUser[0].rol;
    }
    let data = {"appointment_id": this.$route.params.round, "performer": this.$route.params.id}
    await this.fetchTeamFeedback(data);
    await this.myCalendar(this.$route.params.id);
    this.asignEvents();
  },
  methods: {
    ...mapActions('user', ['fetch']),
    ...mapActions('audition', ['fetchAuditionData', 'fetchUserList', 'fetchTeamFeedback', 'searchMarketplace', 'fetchOnlineMedia']),
    ...mapActions('profile', {fetchProfile: "fetch"}),
    ...mapActions('profile', {fetchProfile: "fetch", fetchData:"fetchData", myCalendar:'myCalendar', fetchContract:'fetchContract'}),
    ...mapActions('feedback', ['fetchUserFeedback', 'storeTag', 'storeRecommendation', 'fetchTags', 'fetchRecommendation', 'delete', 'searchMarketplace', 'setRecommendations', 'deleteRecommendation']),
    goToday() {
      this.$refs.calendar.goToday()
    },
    async saveFeedback(){
      try{
        if(this.file.name !='Record Audition'){
          let file = await firebase.storage()
        .ref(`temp/${uuid()}.${this.file.name.split('.').pop()}`)
        .put(this.form.file);

        let url = await file.ref.getDownloadURL();
        let audition_record={
          "url":url,
          "appointment_id":this.$route.params.round,
          "performer":this.$route.params.id,
          "slot_id":this.slot,
          "name": this.file.name || time()+".mp4"
        };
        let files = await axios.post('/t/auditions/video/save', audition_record);
        this.$toasted.success('Audition record saved');
        }
      }catch(e){
        this.$toasted.error('This performer already has a video, try later');
      }
      this.form.callback = this.callback == 1 ?true:false;
      this.form.data = this.$route.params.audition;
      this.form.appointment_id = this.$route.params.round;
      this.form.user = this.$route.params.id;
      this.form.work = this.workon == 1 ? 'vocals' :this.workon == 2 ? 'acting' : 'dancing';
      this.form.favorite = this.favorite
      this.form.evaluation = this.emoji;
      this.form.slot_id = this.slot;
      this.form.evaluator = this.profile.details.id;
      let data = {"appointment_id": this.$route.params.round, "performer": this.$route.params.id}

      if(Object.keys(this.feedback).length==0){
        let status = await axios.post('/t/feedbacks/add', this.form);
        this.$toasted.success('Feedback Created');
        await this.fetchTeamFeedback(data);
        return;
      }
      this.form.user_id = this.$route.params.id;
        let status = await axios.put(`/t/auditions/${this.$route.params.round}/feedbacks/update`, this.form);
        this.$toasted.success('Feedback Updated');
        await this.fetchTeamFeedback(data);
        return;
    },
    handleFile(e) {
      const file = e.target.files[0];

      this.form.file = file;
      this.file.name = file.name;

      // this.preview = URL.createObjectURL(file);
    },
    asignEvents(){
      var finalList = new Array();
        this.calendar.map(function(value) {
          let splitInitDate = value.start_date.split("-");
          let splitFinalDate = value.end_date.split("-");
          finalList.push({
              start: new Date(splitInitDate[0], splitInitDate[1] - 1, splitInitDate[2]),
              end: new Date(splitFinalDate[0], splitFinalDate[1] - 1, splitFinalDate[2])
          });
      });
      this.attrs = [
        {
          bar: {
            color: 'yellow',
            class: 'my-dot-class',
          },
          key: 'today',
          dates: finalList,
        },
      ];
    },
    async setTags(){
      if(this.tag !== ''){
        let data ={
          "title": this.tag,
          "id": null,
          "appointment_id": this.$route.params.round,
          "user_id": this.$route.params.id,
        }

        if( await this.storeTag(data))
          this.$toasted.success('Tag created successfully');
          await this.fetchTags({"round": this.$route.params.round, "user": this.$route.params.id,})
        }
        else{
          this.$toasted.error('Tag not created, try later');
        }
         this.tag = '';
      },
      async setRecommendations(){
        if(this.recommendation !== '' && this.currentMarketplace!==''){
          let data ={
            "title": this.recommendation,
            "marketplace_id": this.currentMarketplace.id,
            "audition_id": this.$route.params.audition,
            "user_id": this.$route.params.id,
          }
          if (await this.storeRecommendation(data))
            this.$toasted.success('Recommendation created successfully');
            await this.fetchRecommendation({"round": this.$route.params.audition, "user": this.$route.params.id,})
          }
          else{
            this.$toasted.error('Recommendation not created, select a Marketplace or try later');
          }
          this.recommendation = '';
      },

      async filterMarketplaces(){
        await this.searchMarketplace(this.marketplaceSearch);
      },

      async selectMarketplace(item){
        this.currentMarketplace = item;
        this.recommendation = item.name;
        await this.setRecommendations();
        this.currentMarketplace = '';
        this.recommendation = '';
      },

      async deleteTag(item){
          try{
            await this.delete(item);
            this.$toasted.success('Tag deleted successfully');
            await this.fetchTags({"round": this.$route.params.round, "user": this.$route.params.id,})
          }catch(e){
            this.$toasted.error('Tag not deleted, try later');
          }
      },

      async deleteRecommended(item){
          try{
            await this.deleteRecommendation(item);
            this.$toasted.success('Recommendation deleted successfully');
            await this.fetchRecommendation({"round": this.$route.params.audition, "user": this.$route.params.id,})
          }catch(e){
            console.log(e);
            this.$toasted.error('Recommendation not deleted, try later');
          }
      },


      show () {
        this.$modal.show('marketplace');
      },
      hide () {
        this.$modal.hide('marketplace');
      }
    },
};
</script>
<style lang="scss">
.custom-resizer {
  width: 100%;
  height: 400px;
}
.custom-resizer > .pane {
  text-align: left;
  padding: 15px;
  overflow: hidden;
  background: #eee;
  border: 1px solid #ccc;
}
.custom-resizer > .pane ~ .pane {
}
.custom-resizer > .multipane-resizer {
  margin: 0; left: 0;
  position: relative;
  &:before {
    display: block;
    content: "";
    width: 3px;
    height: 40px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -20px;
    margin-left: -1.5px;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
  }
  &:hover {
    &:before {
      border-color: #999;
    }
  }
}
nav {
  background-image: linear-gradient(#4D2545, #782541);
}
</style>
