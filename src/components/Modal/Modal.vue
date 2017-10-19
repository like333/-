<template>
	<div class="modal">
		<div class="mask">
			<div class="m-content">
				<div class="modal-header">
					<span class="modal-title">{{modalTitle}}</span>
					<span @click="cancel" class="modal-close">×</span>
				</div>
				<div class="modal-content">
					<slot name="modalContent"></slot>
				</div>
				<div class="modal-btn">
					<input type="button" @click="confirm" value="确定" class="confirm">
					<input type="button" @click="cancel" value="取消" class="cancel">
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import Vue from 'vue'
export default {
	props: {
		types: {//所有分类的对象data:{list:{[],[],[]}}
			type: Object
		},
		modalTitle: {//当前显示的输入框的title
			type: String
		},
		cname: {//输入框中填写的分类名称
			type: String
		},
		selCate: {//选中的要删除的分类
			type: Array
		}
	},
	data() {
		return {
			cateName: this.cname
		}
	},
	watch: {
		cname: function() {
			this.cateName = this.cname
		}
	},
	methods: {
		confirm() {
			if (this.modalTitle === '新建分类') {
				if (this.cateName === '') {
					alert('请输入分类名')
				}
				else {
					if (this._filterCate()) {
						this._add()
					} else {
						alert('这个分类已经存在！')
						this._clearCName()
					}
				}
			}
			if (this.modalTitle === '删除分类')
				this._delSelCate()
			if (this.modalTitle === '编辑分类')
				this.$emit('edit')
		},
		cancel() {
			if (this.modalTitle === '新建分类') {
				this._initCName()
			}
			if (this.modalTitle === '删除分类') {
				this._initDel()
			}
		},
		_add() {
			var addCate = { 'fileType': this.cateName }
			this.types.list.push(addCate)
			this.$nextTick(() => {
				this._initCName()
			})
		},
		_filterCate() {
			let list = this.types.list
			let newCate = this.cateName.trim()
			for (var i = 0, len = list.length; i < len; i++) {
				if (list[i].fileType === newCate) {
					return false
				}
			}
			return true
		},
		_initCName() {
			if (this.cateName != '') {
				this.cateName = ''
			}
			this.$emit('add', this.cateName)
		},
		_clearCName() {
			this.cateName = ''
			this.$emit('clear', this.cateName)
		},
		// 删除选中的分类名
		_delSelCate() {
			let isSel = false
			let list = this.types.list
			for (var i = 0, len = list.length; i < len; i++) {
				if (list[i].isCheck == true) {
					isSel = true
					break
				}
			}
			if (isSel) {
				if (window.confirm('确定要删除吗？')) {
					for (var i = 0, len = list.length; i < len; i++) {
						if (list[i].isCheck == true) {
							this.types.list.splice(i, 1)
							len--
							i--
						}
					}
				} else {
					return
				}
			} else {
				alert('请选择要删除的分类')
			}

		},
		//取消删除
		_initDel() {
			let list = this.types.list
			for (let i = 0, len = list.length; i < len; i++) {
				if (list[i].isCheck) {
					this.types.list[i].isCheck = false
				}
			}
			this.$emit('closeDel')
		},
	},
}
</script>
<style lang="scss">
.modal {
	position: relative;
	z-index: 2;
	.mask {
		width: 100%;
		min-height: 100%;
		background-color: rgba(7, 17, 27, .3);
		position: fixed;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		left: 0;
		top: 0;
		z-index: 1;
		.m-content {
			position: relative;
			z-index: 2;
			width: 500px;
			background-color: #fff;
			border-radius: 4px;
			box-shadow: 0 5px 10px rgba(0, 0, 0, .3);
			.modal-header {
				position: relative;
				width: 100%;
				height: 42px;
				box-sizing: border-box;
				line-height: 42px;
				color: #fff;
				padding-left: 10px;
				background-color: #005c9e;
				border-radius: 4px 4px 0 0;
				.modal-close {
					position: absolute;
					top: 4px;
					right: 5px;
					padding: 5px;
					height: 24px;
					width: 24px;
					font-size: 24px;
					text-align: center;
					line-height: 24px;
					cursor: pointer;
					transition: .4s;
					&:hover {
						transform: rotate(90deg)
					}
				}
			}
			.modal-content {
				padding: 20px;
				max-height: 300px;
				overflow: auto;
			}
			.modal-btn {
				display: flex;
				justify-content: space-around;
				padding-top: 20px;
				margin: 10px 0;
				border-top: 1px solid rgba(7, 17, 27, .1);
				input {
					width: 90px;
					height: 32px;
					line-height: 32px;
					color: #fff;
					border-radius: 4px;
					border: 0;
					cursor: pointer;
					&.confirm {
						background-color: rgba(0, 92, 158, .9);
						transition: .6s;
						&:hover {
							background-color: rgba(0, 92, 158, .7);
						}
						&:active {
							background-color: rgba(0, 92, 158, 1);
						}
					}
					&.cancel {
						background-color: rgba(7, 17, 27, .2);
						color: rgba(7, 17, 27, .7);
						transition: .6s;
						&:hover {
							background-color: rgba(7, 17, 27, .1);
						}
						&:active {
							background-color: rgba(7, 17, 27, .3);
						}
					}
				}
			}
		}
	}
}
</style>


