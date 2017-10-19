<template>
	<div class="publish">
		<div class="content">
			<div class="search-wrapper">
				<input type="button" @click="newType" id="newType" class="green btn" value="新建分类"></input>
				<input type="button" @click="delType" id="delType" class="red btn" value="删除分类"></input>
			</div>
			<div class="file-list">
				<!--上传操作-->
				<div class="box operate">
					<div class="opera-wrapper">
						<label for="fileType">选择文件分类：</label>
						<select class="selector" v-model="selected" id="fileType">
							<option disabled selected>--请选择--</option>
							<option v-for="list in types.list" :key="list.id">{{list.fileType}}</option>
						</select>
					</div>
					<div class="opera-wrapper">
						<span class="text">选择文件：</span>
						<div class="onloadBox" @click="onLoadFile" :class="{'disabled':isDisabled}">
							<label for="onloadFile">上传文件</label>
							<input :disabled='isDisabled' @change="fileChange" type="file" ref="onloadFile" id="onloadFile" value="上传文件" accept="text/plain,application/pdf,application/vnd.ms-powerpoint,application/vnd.ms-excel,application/msword,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
						</div>
					</div>
				</div>
				<div class="flieList bor box">
					<p class="tips" :class="{'isOnload':isOnload}">还没有上传任何文件</p>
					<ul :class="{'isOnload':!isOnload}">
						<li v-for="(list,index) in addFileList" :key="list.id" class="file-item">
							<FileIcon :name="list.filename"></FileIcon>
							<a class="olName" href="javascript::">{{list.filename}}</a>
							<em class="olType">{{list.fileType}}</em>
							<span class="olDate">{{list.onloadeDate}}</span>
							<span class="del-btn" @click="delItem(index)">
								<svg class="icon" aria-hidden="true">
									<use xlink:href="#icon-del"></use>
								</svg>
							</span>
						</li>
					</ul>
				</div>
				<!--发布按钮-->
				<div class="box pubBtn">
					<input type="button" @click="publish" class="blue btn" value="发布" />
				</div>
			</div>
		</div>
		<!-- <transition name="fade"> -->
		<div class="modal">
			<transition name="fade">
				<Modal v-show="modalShow" :modalTitle="modalTitle" :types="types" :selCate="selCate" :cname="categoryName" @add="addConfirm" @clear="inputClear" @closeDel="closeDel">
					<div slot="modalContent" class="content addCate" v-show="newShow.show">
						<input ref="addInput" type="text" placeholder="输入分类名" v-model="categoryName">
					</div>
					<div slot="modalContent" class="content delCate" v-show="delShow.show">
						<div class="liet-wrapper" v-for="(type,index) in types.list" :key="type.id">
							<input type="checkbox" id="chkbox" v-model="type.isCheck" class="chk">
							<span>{{type.fileType}}</span>
						</div>
					</div>
					<h1 slot="modalContent" class="content" v-show="editShow.show">编辑分类</h1>
				</Modal>
			</transition>
		</div>
		<!-- </transition> -->
	</div>
</template>
<script>
import Vue from 'vue'
import mock from '@/util/mock'
import Modal from '#/Modal/Modal'
import FileIcon from '#/fileIcon/FileIcon'
import formatDate from '@/common/js/formatDate'
export default {
	data() {
		return {
			// filelist: {},
			addFileList: [],
			// types: {},
			selCate: [],//选中要删除的分类
			newShow: { show: false, title: '新建分类' },
			delShow: { show: false, title: '删除分类' },
			editShow: { show: false, title: '编辑分类' },
			modalShow: false,
			categoryName: '',
			isOnload: false, //是否上传了文件
			selected: '',//选择的文件分类
			isDisabled: true,//是否选择了要上传文件所属分类,上传文件按钮是否可用
		}
	},
	props: {
		filelist: {
			type: Object
		},
		types: {
			type: Object
		}
	},
	computed: {
		modalTitle() {
			if (this.newShow.show) return this.newShow.title
			if (this.delShow.show) return this.delShow.title
			if (this.editShow.show) return this.editShow.title
		},
	},
	// created() {
	// 	this.$http.get("/file/list.do").then(res => {
	// 		var res = res.body
	// 		this.filelist = Object.assign({}, this.filelist, res.data)
	// 	}, res => {
	// 	})
	// 	this.$http.get("/category/get_category.do").then(res => {
	// 		var res = res.body
	// 		this.types = Object.assign({}, this.types, res.data)
	// 	}, res => {
	// 	})

	// },
	watch: {
		selected: function() {
			if (this.selected != '')
				this.isDisabled = false
		}

	},
	methods: {
		//新建分类
		newType() {
			this.modalShow = true
			this.newShow.show = true
		},
		addConfirm(value) {
			this.categoryName = value
			this.$nextTick(() => {
				this.modalShow = false
				setTimeout(() => {
					this.newShow.show = false
				}, 500)
			})
		},
		inputClear(value) {
			this.categoryName = value
		},
		//删除分类
		delType() {
			this.modalShow = true
			this.delShow.show = true
		},
		//编辑分类
		editType() {
			this.modalShow = true
			this.editShow.show = true
		},
		// 关闭delClose
		closeDel() {
			this.modalShow = false
			setTimeout(() => {
				this.delShow.show = false
			}, 500)
		},
		// 上传文件
		onLoadFile() {
			//首先判断是否已经选择分类
			if (this.selected == '') {
				alert('请选择分类！')
			} else {
				this.isDisabled = false
			}
			//已经选择分类后，上传文件
			//上传文件格式，pdf,txt,doc,pptx,xlsx，上传成功之后将isOnload设置为true，
			// 在列表里显示上传的文件

		},
		fileChange(event) {
			var file = event.target.files[0]
			this.isOnload = true
			if (file) {
				var list = {}
				list.filename = file.name
				for (var i = 0; i < this.addFileList.length; i++) {
					if (file.name == this.addFileList[i].filename) {
						alert('您已经上传过这个文件')
						return
					}
				}
				var ext = /\.[^\.]+$/.exec(file.name)[0]
				list.fileType = this.selected
				list.onloadeDate = formatDate(file.lastModifiedDate)
				this.addFileList.push(list)
			}

		},
		publish() {
			if (!this.isOnload) {
				alert('请上传文件！')
			} else {
				alert('上传成功！')
				this.addFileList = []
				this.isOnload = false
				// 跳转到管理页面，并且将list数据添加进去
			}
		},
		//删除文件
		delItem(index) {
			this.addFileList.splice(index, 1)
			if (this.addFileList.length == 0) {
				this.isOnload = false
			}
		}
	},
	components: {
		Modal,
		FileIcon
	}
}
</script>
<style lang="scss">
.file-list {
	.operate {
		margin-top: 16px;
		border-top: 1px solid #eee;
		.opera-wrapper {
			margin: 16px 0;
			.text {
				display: inline-block;
				vertical-align: middle;
			}
			.onloadBox {
				position: relative;
				display: inline-block;
				width: 100px;
				text-align: center;
				height: 32px;
				line-height: 32px;
				margin-left: 28px;
				border-radius: 4px;
				overflow: hidden;
				background-color: coral;
				color: #fff;
				vertical-align: middle;
				&.disabled {
					border: 1px solid rgba(7, 17, 27, .1);
					background-color: rgba(7, 17, 27, .1);
				}
				label {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					border-radius: 4px;
				}
				#onloadFile {
					cursor: pointer;
					opacity: 0;
				}
			}
		}
	}
	.flieList {
		border-radius: 4px;
		max-width: 50vw;
		min-width: 550px;
		max-height: 39vh;
		overflow: auto;
		background-color: rgba(7, 17, 27, .04);
		.tips {
			padding: 30px;
			text-align: center;
			font-size: 20px;
			color: #ccc;
		}
		.file-item {
			position: relative;
			height: 48px;
			line-height: 48px;
			padding: 0 10px;
			border-bottom: 1px solid rgba(7, 17, 27, .1);
			&:last-child {
				border-bottom: 0;
			}
			.olName {
				color: #666;
				padding-right: 10px;
				&:hover {
					text-decoration: underline;
				}
			}
			.olType,
			.olDate {
				position: absolute;
				color: #999;
				font-size: 12px;
				padding: 0 10px;
			}
			.olType {
				right: 110px;
			}
			.olDate {
				right: 30px;
			}
			.del-btn {
				position: absolute;
				top: 3px;
				right: 10px;
				cursor: pointer;
				.icon {
					font-size: 20px;
				}
			}
		}
		.isOnload {
			display: none;
		}
	}
	.pubBtn {
		margin-top: 40px;
		padding: 20px 0;
		border-top: 1px solid #eee;
	}
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity .5s
}

.fade-enter,
.fade-leave-to
/* .fade-leave-active in below version 2.1.8 */

{
	opacity: 0
}
</style>


