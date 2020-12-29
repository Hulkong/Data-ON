<template>
  <div>
    <el-row>
      <el-col>
        <h2 class="u-tit01">회원 검색</h2>
      </el-col>
    </el-row>

    <div class="search-container">
      <el-row>
        <el-col :span="4" class="header-col">
          <label for="select1">검색어</label>
        </el-col>

        <el-col :span="20">
          <el-select class="w20p" v-model="select1" @change="input1 = ''" id="select1" size="small">
            <el-option label="--전체검색--" value="" />
            <el-option label="아이디" value="1" />
            <el-option label="이름" value="2" />
            <el-option label="이메일" value="3" />
            <el-option label="연락처" value="4" />
            <el-option label="가입일" value="5" />
            <el-option label="최근접속일" value="6" />
          </el-select>

          <el-input v-show="!dateSelectList.includes(select1)" class="w70p" maxlength="200" v-model="input1" size="small" />
          <el-date-picker v-show="dateSelectList.includes(select1)" class="w70p" type="date" v-model="input1" size="small" />
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="4" class="header-col">가입구분</el-col>

        <el-col :span="20">
          <el-checkbox-group v-model="checkbox1">
            <el-checkbox label="1">일반</el-checkbox>
            <el-checkbox label="2">카카오</el-checkbox>
            <el-checkbox label="3">네이버</el-checkbox>
            <el-checkbox label="4">페이스북</el-checkbox>
            <el-checkbox label="5">구글</el-checkbox>
          </el-checkbox-group>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="4" class="header-col">
          <label onclick="document.getElementById('radio1').click()">이메일 수신여부</label>
        </el-col>

        <el-col :span="20">
          <el-radio v-model="radio1" label="" id="radio1">전체</el-radio>
          <el-radio v-model="radio1" label="1">수신허용</el-radio>
          <el-radio v-model="radio1" label="2">수신거부</el-radio>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="4" class="header-col">
          <label for="select2">회원상태</label>
        </el-col>

        <el-col :span="20">
          <el-select v-model="select2" id="select2">
            <el-option label="-- 전체 --" value="" />
            <el-option label="가입" value="1" />
            <el-option label="휴면" value="2" />
            <el-option label="탈퇴" value="3" />
          </el-select>
        </el-col>
      </el-row>
    </div>

    <el-row class="mg20t">
      <el-col class="tc">
        <el-button>검색</el-button>
      </el-col>
    </el-row>

    <el-row class="mg20t">
      <el-col :span="12" class="pad10l">전체 <span class="data-length-span">{{ tableData ? tableData.length : 0 }}</span>건</el-col>

      <el-col :span="12" class="tr">
        <el-select class="w30p" v-model="select3" size="small">
          <el-option label="가입일" value="1" />
          <el-option label="최근접속일" value="2" />
          <el-option label="아이디" value="3" />
          <el-option label="이름" value="4" />
          <el-option label="이메일" value="5" />
        </el-select>

        <el-select class="w30p" v-model="select4" size="small">
          <el-option label="10개씩" value="10" />
          <el-option label="50개씩" value="50" />
          <el-option label="100개씩" value="100" />
        </el-select>

        <el-button size="small">엑셀다운로드</el-button>
      </el-col>
    </el-row>

    <el-row class="mg20t">
      <el-col>
        <el-table :data="tableData">
          <el-table-column label="번호" width="63" align="center">
            <template slot-scope="scope">{{ scope.row.data1 }}</template>
          </el-table-column>

          <el-table-column label="가입구분" width="79" align="center">
            <template slot-scope="scope">{{ scope.row.data2 }}</template>
          </el-table-column>

          <el-table-column label="아이디" width="128" align="center">
            <template slot-scope="scope">{{ scope.row.data3 }}</template>
          </el-table-column>

          <el-table-column label="이름" width="96" align="center">
            <template slot-scope="scope">{{ scope.row.data4 }}</template>
          </el-table-column>

          <el-table-column label="이메일" align="center">
            <template slot-scope="scope">{{ scope.row.data5 }}</template>
          </el-table-column>

          <el-table-column label="연락처" width="118" align="center">
            <template slot-scope="scope">{{ scope.row.data6 }}</template>
          </el-table-column>

          <el-table-column prop="reg_date" label="가입일" width="118" align="center">
            <template slot-scope="scope">{{ $dateFormat(scope.row.data7, '-') }}</template>
          </el-table-column>

          <el-table-column prop="reg_date" label="최근접속일" width="118" align="center">
            <template slot-scope="scope">{{ $dateFormat(scope.row.data8, '-') }}</template>
          </el-table-column>

          <el-table-column label="상태" width="69" align="center">
            <template slot-scope="scope">{{ scope.row.data9 }}</template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-row class="mg40t tc">
      <el-col>
        <el-pagination layout="prev, pager, next" :total="0" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return {
      dateSelectList: ['5', '6'], // 검색어 선택 시 date picker 출력 되는 선택 값
      select1: '',
      input1: '',
      checkbox1: ['1', '2', '3', '4', '5'],
      radio1: '',
      select2: '',
      select3: '1',
      select4: '10',
      tableData: [{
        data1: '2',
        data2: '구글',
        data3: '아이디',
        data4: '홍길동',
        data5: 'abc@naver.com',
        data6: '010-777-7777',
        data7: '2020-12-03',
        data8: '2020-12-03',
        data9: '휴면'
      }, {
        data1: '1',
        data2: '일반',
        data3: '아이디',
        data4: '홍길동',
        data5: 'abc@naver.com',
        data6: '010-777-7777',
        data7: '2020-12-03',
        data8: '2020-12-03',
        data9: '가입'
      }],
      posts: { // 데이터 가져올때 필요한  파라미터들
        param: {},
        url: '',
        storeName: ''
      }
    }
  }
}
</script>
