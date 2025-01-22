# GPA-calculator
这是一个用于计算大学生 GPA 的 Web 应用程序。它提供了直观的界面来管理课程成绩并实时计算 GPA。

## 功能特点

- 支持输入课程名称和原始百分制成绩
- 可以添加多个考试成绩和一个平时成绩
- 实时计算并显示 GPA
- 自动更新总体平均学分绩点
- 课程成绩排名实时显示

## 技术栈

- 后端：Python Flask
- 前端：React + Ant Design
- 数据库：SQLite

## 安装说明

### 后端设置

1. 进入后端目录：
   ```bash
   cd backend
   ```

2. 创建虚拟环境并激活：
   ```bash
   python -m venv venv
   source venv/bin/activate  # 在 Windows 上使用 venv\Scripts\activate
   ```

3. 安装依赖：
   ```bash
   pip install -r requirements.txt
   ```

4. 运行后端服务器：
   ```bash
   python app.py
   ```

### 前端设置

1. 进入前端目录：
   ```bash
   cd frontend
   ```

2. 安装依赖：
   ```bash
   npm install
   ```

3. 运行前端开发服务器：
   ```bash
   npm start
   ```

## 使用说明

1. 打开浏览器访问 http://localhost:3000
2. 在"添加新课程"卡片中输入课程信息：
   - 课程名称
   - 考试成绩（可以添加多个）
   - 平时成绩
3. 点击"提交"按钮保存课程信息
4. 在下方可以查看所有课程的列表和总体 GPA

## GPA 计算规则

当前的 GPA 计算规则如下：

- 90-100 分 = 4.0
- 85-89 分 = 3.7
- 82-84 分 = 3.3
- 78-81 分 = 3.0
- 75-77 分 = 2.7
- 72-74 分 = 2.3
- 68-71 分 = 2.0
- 64-67 分 = 1.5
- 60-63 分 = 1.0
- 60 分以下 = 0.0

最终成绩计算方式：
- 考试成绩平均值 × 70% + 平时成绩 × 30%

## aaa@mail.com